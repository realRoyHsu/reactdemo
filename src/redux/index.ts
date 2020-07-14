import { createStore, applyMiddleware, Store, AnyAction } from "redux";
import thunk from "redux-thunk";
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import reducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfo"],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store: Store<any, AnyAction> = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export { store, persistor };
