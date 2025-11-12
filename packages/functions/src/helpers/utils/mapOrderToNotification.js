export function mapOrderToNotification(shopId, order) {
  return {
    shopId,
    firstName: order.customer.firstName,
    city: order.customer.defaultAddress?.city || null,
    country: order.customer.defaultAddress?.country || null,
    productId: order.lineItems[0].id,
    productName: order.lineItems[0].name,
    productImage: order.lineItems[0].image?.url || null,
    timestamp: order.createdAt
  };
}
