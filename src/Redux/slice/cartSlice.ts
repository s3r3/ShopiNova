// src/Redux/slice/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface CartItem {
  id: number | string;
  brand?: string;
  src: string;
  tittle?: string;
  price?: string;
  whiteText?:boolean;
  type:'cart' | 'category'
}

const initialState = {
  cartItems: [] as CartItem[],
  cartToggle: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: { payload: CartItem }) {
      state.cartItems.push(action.payload);
    },
    toggleCart(state) {
      state.cartToggle = !state.cartToggle;
    },
    removeFromCart(state, action: { payload: number }) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, toggleCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;