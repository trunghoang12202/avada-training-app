import {initShopify} from '@functions/services/shopifyService';
import appConfig from '@functions/config/app';
import {isEmpty} from '@avada/utils';

/**
 *
 * @param shop
 * @param event
 * @returns {Promise<Shopify.IWebhook>}
 */
export async function registerWebhook(shop) {
  const shopify = await initShopify(shop);
  const currentWebhooks = await shopify.webhook.list();
  const unusedHooks = currentWebhooks.filter(
    webhook => !webhook.address.includes(appConfig.baseUrl)
  );

  if (!isEmpty(unusedHooks))
    await Promise.all(unusedHooks.map(webhook => shopify.webhook.delete(webhook.id)));

  const webhooks = await shopify.webhook.list({
    address: `https://${appConfig.baseUrl}/webhook/orders/new`
  });

  if (webhooks.length === 0)
    return await shopify.webhook.create({
      topic: 'orders/create',
      address: `https://${appConfig.baseUrl}/webhook/orders/new`,
      format: 'json'
    });
}
