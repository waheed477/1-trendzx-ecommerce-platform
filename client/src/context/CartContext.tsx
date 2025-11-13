import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { cartService } from '../services/cartService';

interface CartState {
  items: CartItem[];
  total: number;
  isLoading: boolean;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CART':
      return { 
        ...state, 
        items: action.payload,
        total: calculateTotal(action.payload)
      };
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.productId === action.payload._id);
      let newItems: CartItem[];
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.productId === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { 
          productId: action.payload._id, 
          quantity: 1, 
          product: action.payload 
        }];
      }
      
      return { ...state, items: newItems, total: calculateTotal(newItems) };
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.productId !== action.payload);
      return { ...state, items: filteredItems, total: calculateTotal(filteredItems) };
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      return { ...state, items: updatedItems, total: calculateTotal(updatedItems) };
    
    case 'CLEAR_CART':
      return { items: [], total: 0, isLoading: false };
    
    default:
      return state;
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);
};

const initialState: CartState = {
  items: [],
  total: 0,
  isLoading: false
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const token = localStorage.getItem('token');
      
      // FIXED: Only load cart if user is authenticated
      if (!token) {
        dispatch({ type: 'SET_CART', payload: [] });
        return;
      }
      
      const cartData = await cartService.getCart();
      // FIXED: Handle nested API response structure
      const cartItems = cartData?.data?.items || cartData?.items || [];
      dispatch({ type: 'SET_CART', payload: cartItems });
    } catch (error) {
      console.error('Failed to load cart:', error);
      // Don't show error for unauthenticated users
      if (!error.message.includes('Unauthorized')) {
        console.error('Cart loading error:', error);
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (product: Product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // For unauthenticated users, just update local state
        dispatch({ type: 'ADD_ITEM', payload: product });
        return;
      }
      
      await cartService.addToCart(product._id, 1);
      dispatch({ type: 'ADD_ITEM', payload: product });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // For unauthenticated users, just update local state
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
        return;
      }
      
      await cartService.removeFromCart(productId);
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // For unauthenticated users, just update local state
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
        return;
      }
      
      await cartService.updateQuantity(productId, quantity);
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    } catch (error) {
      console.error('Failed to update quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await cartService.clearCart();
      }
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  };

  const getCartTotal = () => state.total;

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};