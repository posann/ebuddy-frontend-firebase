import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./reducers";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
