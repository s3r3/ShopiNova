// menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showMenu: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.showMenu = !state.showMenu;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;