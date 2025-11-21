import {prepareShopData} from '@avada/core';
import shopifyConfig from '../config/shopify';
import Shopify from 'shopify-api-node';
import appConfig from '@functions/config/app';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';

export const API_VERSION = '2024-04';

/**
 * Create Shopify instance with the latest API version and auto limit enabled
 *
 * @param {Shop} shopData
 * @param {string} apiVersion
 * @return {Shopify}
 */
export function initShopify(shopData, apiVersion = API_VERSION) {
  const shopParsedData = prepareShopData(shopData.id, shopData, shopifyConfig.accessTokenKey);
  const {shopifyDomain, accessToken} = shopParsedData;
  return new Shopify({
    shopName: shopifyDomain,
    accessToken,
    apiVersion,
    autoLimit: true
  });
}

/**
 *
 * @param shopData
 * @returns {Promise<void>}
 */
export async function registerScriptTag(shopData) {
  const shopify = initShopify(shopData);
  await shopify.scriptTag.create({
    event: 'onload',
    src: `https://${appConfig.baseUrl}/scripttag/avada-sale-pop.min.js`
  });
}

/**
 *
 * @param shopData
 * @param appName
 * @returns {Promise<boolean>}
 */
export async function getThemeAppExtensionStatus(shopData, appName) {
  const shopify = await initShopify(shopData);
  const query = loadGraphQL('/theme.graphql');
  const data = await shopify.graphql(query);

  const themes = data?.themes?.edges || [];

  if (themes.length === 0) {
    return false;
  }

  let status = false;

  for (const theme of themes) {
    const files = theme?.node?.files?.edges || [];
    const fileContent = files[0]?.node?.body?.content;

    if (!fileContent) {
      break;
    }

    const startIndex = fileContent.indexOf('{');
    const settingsJson = JSON.parse(fileContent.slice(startIndex));

    const blocks = settingsJson.current?.blocks || {};
    const appBlockId = Object.keys(blocks).find(id => blocks[id].type.includes(appName));

    if (appBlockId) {
      status = !blocks[appBlockId].disabled;
    }
  }

  return status;
}
