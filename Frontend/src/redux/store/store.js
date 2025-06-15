import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index";
import reportReducer from "./reportSlice/index";
import userReducer from "./userSlice/index"

const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    users: userReducer,
  },
});

export default store;