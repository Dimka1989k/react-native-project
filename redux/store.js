import {
  configureStore,
  createReducer,
  createAction,
  combineReducers,
} from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";

// export const changeAuth = createAction('isAuth/increment');

// const myReducer = createReducer(false, {
//   [changeAuth]: (state, action) => (state = action.payload),
// });

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
