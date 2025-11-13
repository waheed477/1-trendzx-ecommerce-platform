import React from 'react';
import { Order } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface OrderSummaryProps {
  order: Order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold">Items</h4>
          {order.orderItems.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {item.quantity} x {item.product?.name || 'Product'}
              </span>
              <span>${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping:</span>
            <span>${order.shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax:</span>
            <span>${order.taxPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total:</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Shipping Address</h4>
          <div className="text-sm">
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Payment Method</h4>
          <p className="text-sm">{order.paymentMethod}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;