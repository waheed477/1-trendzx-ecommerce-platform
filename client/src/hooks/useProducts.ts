import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductFilters {
  category?: string;
  priceRange?: [number, number];
  search?: string;
  sortBy?: string;
  limit?: number;
}

export const useProducts = (filters?: ProductFilters) => {
  const { addNotification } = useApp();

  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: 'Failed to load products'
      });
    },
    // FIXED: Transform data to extract products from nested response
    select: (data) => {
      return {
        ...data,
        products: data.data?.products || data.products || []
      };
    }
  });
};

export const useProduct = (id: string) => {
  const { addNotification } = useApp();

  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: 'Failed to load product details'
      });
    },
    // FIXED: Transform data to handle nested response
    select: (data) => data.data?.product || data.product || data
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      addNotification({
        type: 'success',
        message: 'Product created successfully'
      });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: 'Failed to create product'
      });
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      productService.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      addNotification({
        type: 'success',
        message: 'Product updated successfully'
      });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: 'Failed to update product'
      });
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useApp();

  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      addNotification({
        type: 'success',
        message: 'Product deleted successfully'
      });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: 'Failed to delete product'
      });
    }
  });
};