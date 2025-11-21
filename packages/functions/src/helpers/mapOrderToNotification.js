/**
 * primitive
 *
 * @param shopId
 * @param order
 * @returns {{shopId: *, firstName: *, city, country, productId: *, productName: *, productImage, timestamp: *}}
 */
export function mapOrderToNotification(shopId, order) {
  return {
    shopId,
    orderId: order.id,
    firstName: order.customer.firstName,
    city: order.displayAddress?.city || null,
    country: order.displayAddress?.country || null,
    productId: order.lineItems[0]?.id,
    productName: order.lineItems[0]?.name,
    handle: order.lineItems[0]?.product?.handle || null,
    productImage: order.lineItems[0]?.image?.url || null,
    timestamp: new Date(order.createdAt)
  };
}
