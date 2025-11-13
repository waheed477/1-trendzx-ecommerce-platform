import { api } from './api';
import { User, LoginCredentials, RegisterCredentials, ApiResponse } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>(
      '/auth/login',
      credentials
    );
    
    if (!response.success) {
      throw new Error(response.error || 'Login failed');
    }
    
    return response.data!;
  },

  async register(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>(
      '/auth/register',
      credentials
    );
    
    if (!response.success) {
      throw new Error(response.error || 'Registration failed');
    }
    
    return response.data!;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to get user');
    }
    
    return response.data!;
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put<ApiResponse<User>>('/auth/profile', userData);
    
    if (!response.success) {
      throw new Error(response.error || 'Profile update failed');
    }
    
    return response.data!;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }
};