/**
 *
 * @returns {boolean}
 */
export function isMobileDevice() {
  return window.innerWidth < 768;
}

/**
 *
 * @param showOnMobile
 * @returns {boolean}
 */
export function shouldHideOnMobile({showOnMobile}) {
  return !showOnMobile && isMobileDevice();
}

/**
 *
 * @param handle
 * @returns {string}
 */
export function getProductLink(handle) {
  return `https://${window.Shopify.shop}/products/${handle}`;
}
