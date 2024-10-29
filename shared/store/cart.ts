import { create } from 'zustand';
import { CartStateItem, getCartDetails } from '../lib/get-cart-details';
import { Api } from '../services/api-client';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set(state => ({ 
        loading: true, 
        error: false, 
        items: state.items.map(item => item.id === id ? { ...item, disabled: true } : item) 
      }));
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set(state => ({ 
        loading: false, 
        items: state.items.map(item => item.id === id ? { ...item, disabled: false } : item) 
      }));
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set(state => ({ 
        loading: true, 
        error: false, 
        items: state.items.map(item => item.id === id ? { ...item, disabled: true } : item) 
      }));
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set(state => ({ 
        loading: false, 
        items: state.items.map(item => item.id === id ? { ...item, disabled: false } : item) 
      }));
    }
  },

  addCartItem: async (values) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));

