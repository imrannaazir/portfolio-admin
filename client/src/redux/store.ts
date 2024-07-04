import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./features/api/baseApi";
import authSlice from "./features/auth/authSlice";
import {
  persistReducer,
  persistStore,
  /*  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE, */
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalSlice from "./features/modal/modalSlice";
import filterSlice from "./features/filter/filterSlice";
import { alertModalReducer } from "./features/modal/alertModal.slice";

const persistConfig = {
  key: "auth",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    modal: modalSlice,
    filter: filterSlice,
    alertModal: alertModalReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: false,
      /* 
      {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
      */
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
