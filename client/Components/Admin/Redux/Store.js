import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import Login from "./Slices/Login";

const persistConfig = ({
    key: "Admin",
    storage
})

const rootReducer = combineReducers({
    Admin_INFO: Login,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
    reducer: persistedReducer,
});

export const Persistor = persistStore(Store);
