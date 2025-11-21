import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {deepUnwrap} from '@functions/helpers/utils/graphql';
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
  return deepUnwrap(data.orders);
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
  const mapOrderIdToFirestoreId = {};
  notificationsInFirestore.forEach(n => {
    mapOrderIdToFirestoreId[n.orderId] = n.id;
  });

  const syncedNotifications = notifications.map(notification => {
    const existingId = mapOrderIdToFirestoreId[notification.orderId];

    return {
      ...notification,
      id: existingId || null
    };
  });

  return await syncNotifications(syncedNotifications);
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
  const order = deepUnwrap(data.order);
  return mapOrderToNotification(orderData.shopId, order);
}
