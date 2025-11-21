import {getCurrentShopData} from '@functions/helpers/auth';
import {getThemeAppExtensionStatus} from '@functions/services/shopifyService';

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getThemeAppExtStatus(ctx) {
  const shopData = getCurrentShopData(ctx);
  const status = await getThemeAppExtensionStatus(shopData, 'avada-sale-pop');
  console.log('status 2', status);
  ctx.body = {
    data: {
      status
    }
  };
}
