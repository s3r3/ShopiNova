import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";
import cartReducer from "./slice/cartSlice";

const rootReducer = combineReducers({
  menu: menuReducer,
  cart: cartReducer,
});
const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
