import {syncOrdersToNotification} from '@functions/services/orderService';
import {addDefaultSettingsForShop} from '@functions/services/settingService';
import {getShopByShopifyDomain} from '@avada/core';
import {registerWebhook} from '@functions/services/webhookService';

/**
 *
 * @param ctx
 * @returns {Promise<Awaited<FirebaseFirestore.WriteResult[]>[]>}
 */
export async function afterInstall(ctx) {
  const shopDomain = ctx.state.shopify.shop;
  const shopData = await getShopByShopifyDomain(shopDomain);

  return await Promise.all([
    syncOrdersToNotification(shopData),
    addDefaultSettingsForShop(shopData),
    registerWebhook(shopData)
  ]);
}
