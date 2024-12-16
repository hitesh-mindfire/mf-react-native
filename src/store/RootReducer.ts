import { persistReducer } from "redux-persist";
import { UnknownAction, combineSlices } from "@reduxjs/toolkit";
import { authSlice } from "./slices";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const RESET_STATE = "RESET_STATE";

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};

/**
 * persistence config for auth reducer
 */
const persistAuthConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["isAuthenticated"],
};

/**
 * Combine all the reducers
 */
const appReducer = combineSlices({
  auth: persistReducer(persistAuthConfig, authSlice.reducer),
});

/**
 * Return root reduces
 * Provides method to reset redux state
 * @param state
 * @param action
 */
export const rootReducer = (state: any, action: UnknownAction) => {
  if (action.type === RESET_STATE) {
    AsyncStorage.multiRemove(["persist:auth"]);
  }
  return appReducer(state, action);
};
