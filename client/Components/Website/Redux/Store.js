import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import LoginSlice from "./Slices/LoginSlice";
import CartSlice from "./Slices/CartSlice"
const persistConfig = ({
    key: "Website",
    storage
})

const rootReducer = combineReducers({
    Login: LoginSlice,
    Cart: CartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
    reducer: persistedReducer,
});

export const Persistor = persistStore(Store);
