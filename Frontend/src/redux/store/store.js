import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import reportReducer from "./reportSlice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
  },
});

export default store;