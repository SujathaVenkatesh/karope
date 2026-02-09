import { configureStore } from "@reduxjs/toolkit";
import { api } from "../Api/Api";
import { rtkQueryErrorLogger } from "../errorLogger";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,

  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger);
  },
});

export default store;
