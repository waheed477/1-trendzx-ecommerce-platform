import { api } from './api';
import { CartItem, ApiResponse } from '../types';

export const cartService = {
  async getCart(): Promise<CartItem[]> {
    const response = await api.get<ApiResponse<{ cart: { items: CartItem[] } }>>('/cart');
    // FIXED: Handle nested API response structure
    return response.data?.cart?.items || response.data?.items || [];
  },

  async addToCart(productId: string, quantity: number = 1): Promise<CartItem[]> {
    const response = await api.post<ApiResponse<{ cart: { items: CartItem[] } }>>('/cart/add', {
      productId,
      quantity
    });
    // FIXED: Handle nested API response structure
    return response.data?.cart?.items || response.data?.items || [];
  },

  async updateQuantity(productId: string, quantity: number): Promise<CartItem[]> {
    const response = await api.put<ApiResponse<{ cart: { items: CartItem[] } }>>(`/cart/update/${productId}`, {
      quantity
    });
    // FIXED: Handle nested API response structure
    return response.data?.cart?.items || response.data?.items || [];
  },

  async removeFromCart(productId: string): Promise<CartItem[]> {
    const response = await api.delete<ApiResponse<{ cart: { items: CartItem[] } }>>(`/cart/remove/${productId}`);
    // FIXED: Handle nested API response structure
    return response.data?.cart?.items || response.data?.items || [];
  },

  async clearCart(): Promise<void> {
    await api.delete('/cart/clear');
  }
};