import {getNotificationsByShopId} from '@functions/repositories/notificationRepository';
import {getCurrentShop} from '@functions/helpers/auth';

export async function getNotificationsByShop(ctx) {
  const shopId = getCurrentShop(ctx);
  const notifications = await getNotificationsByShopId(shopId);
  ctx.body = {data: notifications};
}
