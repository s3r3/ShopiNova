// src/Redux/slice/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: number | string;
  brand?: string;
  src: string;
  tittle?: string;
  price?: string;
  whiteText?: boolean;
  type: "cart" | "category";
  quantity?: number;
}

const initialState = {
  cartItems: [] as CartItem[],
  cartToggle: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action ) {
      const item = action.payload
      const existingItem = state.cartItems.find((i)=>i.id=== item.id)
      if (existingItem?.quantity){
        existingItem.quantity += 1
      } else {
        state.cartItems.push({...item, quantity:1})
      }
    },
    toggleCart(state) {
      state.cartToggle = !state.cartToggle;
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity !== undefined) {
        item.quantity++;
      } else if (item && item.quantity === undefined) {
        item.quantity = 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity !== undefined) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.cartItems = state.cartItems.filter(
            (i) => i.id !== action.payload
          );
        }
      }
    },
  },
});

export const {
  addToCart,
  toggleCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
