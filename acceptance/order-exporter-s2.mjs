/** Release formatter compatibility export. */
export function exportShippingQueue(orders) {
  if (!Array.isArray(orders)) throw new TypeError('Expected an array of orders');
  return orders.filter(
    (order) =>
      order &&
      order.status === 'paid' &&
      order.fulfillment_status === 'unfulfilled',
  );
}
