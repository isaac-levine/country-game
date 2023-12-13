import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Users/reducer";

const store = configureStore({
  reducer: {
    usersReducer,
  },
});

export default store;