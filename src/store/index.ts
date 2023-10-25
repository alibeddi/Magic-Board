import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import appAxios from "../helpers/axios";
import chats from "./chat/chatSlice";

const store = configureStore({
  reducer: {
    chats,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: appAxios,
      },
      serializableCheck: false,
      logger,
    }),

  devTools: process.env.REACT_APP_BASE_NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
