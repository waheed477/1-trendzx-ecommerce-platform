import { api } from './api';
import { Order, ShippingAddress, ApiResponse } from '../types';

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const response = await api.get<ApiResponse<Order[]>>('/orders');
    return response.data.data;
  },

  async getOrderById(id: string): Promise<Order> {
    const response = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data.data;
  },

  async createOrder(orderData: {
    orderItems: Array<{ productId: string; quantity: number }>;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
  }): Promise<Order> {
    const response = await api.post<ApiResponse<Order>>('/orders', orderData);
    return response.data.data;
  },

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const response = await api.put<ApiResponse<Order>>(`/orders/${id}/status`, { status });
    return response.data.data;
  },

  async cancelOrder(id: string): Promise<Order> {
    const response = await api.put<ApiResponse<Order>>(`/orders/${id}/cancel`);
    return response.data.data;
  }
};