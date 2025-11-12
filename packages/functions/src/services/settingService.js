import {addDefaultSettings} from '@functions/repositories/settingRepository';
import {defaultSettings} from '@functions/const/defaultSettings';

export async function addDefaultSettingsForShop(shop) {
  return await addDefaultSettings({shopId: shop.id, ...defaultSettings});
}
