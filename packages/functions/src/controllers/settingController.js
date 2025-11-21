import {getSettingByShopId, updateSettingByShopId} from '@functions/repositories/settingRepository';
import {getCurrentShop} from '@functions/helpers/auth';

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getSetting(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const setting = await getSettingByShopId(shopId);
    ctx.body = {data: setting};
  } catch (e) {
    console.error(e);
    ctx.body = {
      success: false,
      data: {},
      message: e.message,
      errorName: e.name
    };
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function updateSetting(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const data = ctx.req.body;
    const newSetting = await updateSettingByShopId(shopId, data);
    ctx.body = {data: newSetting};
  } catch (e) {
    console.error(e);
    ctx.body = {
      success: false,
      data: {},
      message: e.message,
      errorName: e.name
    };
  }
}
