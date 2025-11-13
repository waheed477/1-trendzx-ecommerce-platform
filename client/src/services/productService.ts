import { api } from './api';
import { Product, ApiResponse } from '../types';

interface ProductFilters {
  category?: string;
  priceRange?: [number, number];
  search?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.priceRange) {
      params.append('minPrice', filters.priceRange[0].toString());
      params.append('maxPrice', filters.priceRange[1].toString());
    }

    const response = await api.get<ApiResponse<Product[]>>(`/products?${params}`);
    return response.data;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>(`/products/category/${category}`);
    return response.data;
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>('/products', productData);
    return response.data;
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },

  async getCategories(): Promise<string[]> {
    const response = await api.get<ApiResponse<string[]>>('/products/categories');
    return response.data;
  }
};