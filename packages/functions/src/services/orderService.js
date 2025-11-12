import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {deepUnwrap} from '@functions/helpers/utils/graphql';
import {initShopify} from '@functions/services/shopifyService';
import {mapOrderToNotification} from '@functions/helpers/utils/mapOrderToNotification';
import {syncNotifications} from '@functions/repositories/notificationRepository';

export async function getOrders(shopify) {
  const query = loadGraphQL('/orders.graphql');
  const data = await shopify.graphql(query);
  return deepUnwrap(data.orders);
}

export async function syncOrdersToNotification(shop) {
  const shopify = initShopify(shop);
  const orders = await getOrders(shopify);
  const notifications = orders.map(order => mapOrderToNotification(shop.id, order));
  return await syncNotifications(notifications);
}
