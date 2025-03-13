// shopi/src/store/slices/checkoutSlice.ts

import { createSlice } from '@reduxjs/toolkit';

interface CheckoutState {
  email: string | null;
  phone: string | null;
  jenisSalahlain: string | null;
  pending: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: CheckoutState = {
  email: null,
  phone: null,
  jenisSalahlain: null,
  pending: false,
  errorMessage: null,
  successMessage: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setInputStateEmail(state, action: { payload: string }) {
      state.email = action.payload;
      state.phone = null;
      state.jenisSalahlain = 'email';
      state.pending = false;
      state.errorMessage = null;
      state.successMessage = null;
    },
    setInputStatePhone(state, action: { payload: string }) {
      state.phone = action.payload;
      state.email = null;
      state.jenisSalahlain = 'phone';
      state.pending = false;
      state.errorMessage = null;
      state.successMessage = null;
    },
    setJenisSalahlain(state, action: { payload: string }) {
      state.jenisSalahlain = action.payload;
    },
    setPending(state, action: { payload: boolean }) {
      state.pending = action.payload;
    },
    setError(state, action: { payload: string }) {
      state.errorMessage = action.payload;
    },
    setSuccess(state, action: { payload: string }) {
      state.successMessage = action.payload;
    },
    resetForm(state) {
      state.email = null;
      state.phone = null;
      state.jenisSalahlain = null;
      state.pending = false;
      state.errorMessage = null;
      state.successMessage = null;
    },
  },
});

export const {
  setInputStateEmail,
  setInputStatePhone,
  setJenisSalahlain,
  setPending,
  setError,
  setSuccess,
  resetForm,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;