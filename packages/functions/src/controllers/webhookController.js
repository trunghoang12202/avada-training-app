import {getNotificationItem} from '@functions/services/orderService';
import {getShopByShopifyDomain} from '@avada/core';
import {initShopify} from '@functions/services/shopifyService';
import {addNotification} from '@functions/repositories/notificationRepository';

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function listenNewOrder(ctx) {
  try {
    const shopDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;

    const shopData = await getShopByShopifyDomain(shopDomain);
    const shopify = initShopify(shopData);
    const notification = await getNotificationItem(shopify, {shopId: shopData.id, ...orderData});
    await addNotification(notification);

    ctx.status = 200;
  } catch (e) {
    console.log(e);
  }
}
