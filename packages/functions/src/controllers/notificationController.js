import {getNotificationsByShopId} from '@functions/repositories/notificationRepository';
import {getCurrentShop, getCurrentShopData} from '@functions/helpers/auth';
import {getShopByShopifyDomain} from '@avada/core';
import {syncOrdersToNotification} from '@functions/services/orderService';
import {getSettingByShopId} from '@functions/repositories/settingRepository';

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getNotificationsByShop(ctx) {
  const shopId = getCurrentShop(ctx);
  const {limit, sortOrder, nextCursor, prevCursor} = ctx.req.query;
  const {data, pageInfo} = await getNotificationsByShopId(shopId, {
    limit,
    sortOrder,
    nextCursor,
    prevCursor
  });
  ctx.body = {data, pageInfo};
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getNotificationsWithSetting(ctx) {
  const {shopDomain} = ctx.req.query;
  const shop = await getShopByShopifyDomain(shopDomain);

  const notifications = await getNotificationsByShopId(shop.id, {limit: 30});
  const settings = await getSettingByShopId(shop.id);

  ctx.body = {data: {notifications, settings}};
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function syncNotificationsManual(ctx) {
  try {
    const shop = getCurrentShopData(ctx);
    await syncOrdersToNotification(shop);
    const {data: notifications, pageInfo} = await getNotificationsByShopId(shop.id, {});
    console.log('notifications', notifications);
    console.log('pageInfo', pageInfo);
    ctx.body = {
      data: notifications,
      pageInfo
    };
  } catch (e) {
    console.log(e);
    ctx.body = {data: {}, success: false};
  }
}
