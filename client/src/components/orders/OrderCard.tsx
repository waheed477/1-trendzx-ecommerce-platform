import React from 'react';
import { Order } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface OrderCardProps {
  order: Order;
  onViewDetails: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Order #{order._id.slice(-8)}
        </CardTitle>
        <Badge className={getStatusColor(order.status)}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Date:</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Items:</span>
            <span>{order.orderItems.length} items</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total:</span>
            <span className="font-semibold">${order.totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Payment:</span>
            <span className={order.isPaid ? 'text-green-600' : 'text-red-600'}>
              {order.isPaid ? 'Paid' : 'Pending'}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => onViewDetails(order._id)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;