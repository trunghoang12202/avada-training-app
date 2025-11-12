import {syncOrdersToNotification} from '@functions/services/orderService';
import {addDefaultSettingsForShop} from '@functions/services/settingService';
import {getShopByShopifyDomain} from '@avada/core';

export async function afterInstallService(ctx) {
  const shopDomain = ctx.state.shopify.shop;
  const shopData = await getShopByShopifyDomain(shopDomain);
  return await Promise.all([
    syncOrdersToNotification(shopData),
    addDefaultSettingsForShop(shopData)
  ]);
}
