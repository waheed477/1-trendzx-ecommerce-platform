import React from 'react';
import { useOrders } from '../hooks/useOrders';
import OrderCard from '../components/orders/OrderCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';
import { useLocation } from 'wouter';

const OrderHistory: React.FC = () => {
  const { data: orders, isLoading, error } = useOrders();
  const [, setLocation] = useLocation();

  const handleViewOrderDetails = (orderId: string) => {
    // Navigate to order details page (to be implemented)
    setLocation(`/orders/${orderId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-600">Failed to load orders</h3>
              <p className="text-gray-600 mt-2">Please try again later.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <p className="text-gray-600 mt-2">View your past orders and their status</p>
      </div>

      {!orders || orders.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900">No orders yet</h3>
              <p className="text-gray-600 mt-2">Start shopping to see your orders here.</p>
              <Button 
                className="mt-4"
                onClick={() => setLocation('/products')}
              >
                Start Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onViewDetails={handleViewOrderDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;