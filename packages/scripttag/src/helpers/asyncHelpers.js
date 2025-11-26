/**
 *
 * @param ms
 * @returns {Promise<unknown>}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
