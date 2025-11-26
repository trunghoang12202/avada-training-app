import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {normalizeGraphQLResponse} from '@functions/helpers/graphql/graphqlHelpers';
import {initShopify} from '@functions/services/shopifyService';
import {mapOrderToNotification} from '@functions/helpers/mapOrderToNotification';
import {
  getNotificationsWithoutOptions,
  syncNotifications
} from '@functions/repositories/notificationRepository';

/**
 *
 * @param shopify
 * @returns {Promise<*|{}>}
 */
export async function getOrders(shopify) {
  const query = loadGraphQL('/orders.graphql');
  const data = await shopify.graphql(query);
  return normalizeGraphQLResponse(data.orders);
}

/**
 *
 * @param shop
 * @returns {Promise<FirebaseFirestore.WriteResult[]>}
 */
export async function syncOrdersToNotification(shop) {
  const shopify = initShopify(shop);
  const orders = await getOrders(shopify);
  const notifications = orders.map(order => mapOrderToNotification(shop.id, order));
  const notificationsInFirestore = await getNotificationsWithoutOptions(shop.id);
  const syncedNotifications = mapNotificationsWithExistingIds(
    notifications,
    notificationsInFirestore
  );

  return await syncNotifications(syncedNotifications);
}

/**
 *
 * @param notifications
 * @param notificationsInFirestore
 * @returns {*}
 */
function mapNotificationsWithExistingIds(notifications, notificationsInFirestore) {
  const mapOrderIdToFirestoreId = notificationsInFirestore.reduce((acc, notification) => {
    acc[notification.orderId] = notification.id;
    return acc;
  }, {});

  return notifications.map(notification => ({
    ...notification,
    id: mapOrderIdToFirestoreId[notification.orderId] || null
  }));
}

/**
 *
 * @param shopify
 * @param orderData
 * @returns {Promise<{shopId: *, firstName: *, city, country, productId: *, productName: *, productImage, timestamp: *}>}
 */
export async function getNotificationItem(shopify, orderData) {
  const query = loadGraphQL('/order.graphql');
  const data = await shopify.graphql(query, {id: orderData.admin_graphql_api_id});
  const order = normalizeGraphQLResponse(data.order);
  return mapOrderToNotification(orderData.shopId, order);
}
