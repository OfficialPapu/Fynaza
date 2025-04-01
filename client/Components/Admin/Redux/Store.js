import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";
import LoginSlice from "./Slices/LoginSlice";
import OrderDetailsSlice from "./Slices//OrderDetailsSlice";
const persistConfig = ({
    key: "Admin",
    storage,
    transforms: [
        encryptTransform({
            secretKey: process.env.NEXT_PUBLIC_PERSIST_ENCRYPT_KEY,
            onError: function (error) {
                localStorage.clear();
                window.location.href = "/";
            },
        }),
    ],
})

const rootReducer = combineReducers({
    Admin: LoginSlice,
    OrderDetails: OrderDetailsSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
    reducer: persistedReducer,
});

export const Persistor = persistStore(Store);
