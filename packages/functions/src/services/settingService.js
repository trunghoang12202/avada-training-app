import {addDefaultSettings} from '@functions/repositories/settingRepository';
import {defaultSettings} from '@functions/const/defaultSettings';

/**
 *
 * @param shop
 * @returns {Promise<string>}
 */
export async function addDefaultSettingsForShop(shop) {
  return addDefaultSettings({shopId: shop.id, ...defaultSettings});
}
