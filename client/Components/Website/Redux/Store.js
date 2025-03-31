import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import LoginSlice from "./Slices/LoginSlice";
import CartSlice from "./Slices/CartSlice";
import CheckoutSlice from "./Slices/CheckoutSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";
const persistConfig = {
    key: "Website",
    storage,
    // transforms: [
    //     encryptTransform({
    //         secretKey: process.env.NEXT_PUBLIC_PERSIST_ENCRYPT_KEY,
    //         onError: function (error) {
    //             localStorage.clear(); 
    //             window.location.href = "/";
    //         },
    //     }),
    // ],
};

const rootReducer = combineReducers({
    Login: LoginSlice,
    Cart: CartSlice,
    Checkout: CheckoutSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
    reducer: persistedReducer,
});

export const Persistor = persistStore(Store);
