    import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orderService';
import { useApp } from '../context/AppContext';

export const useOrders = () => {
  const { addNotification } = useApp();

  return useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getOrders,
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: 'Failed to load orders'
      });
    }
  });
};

export const useOrder = (id: string) => {
  const { addNotification } = useApp();

  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: 'Failed to load order details'
      });
    }
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      addNotification({
        type: 'success',
        message: 'Order created successfully'
      });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: 'Failed to create order'
      });
    }
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      orderService.updateOrderStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
      addNotification({
        type: 'success',
        message: 'Order status updated successfully'
      });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: 'Failed to update order status'
      });
    }
  });
};