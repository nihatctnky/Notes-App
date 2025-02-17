import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tagsReducer from "./slices/tagsSlice";
import notesReducer from "./slices/notesSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Redux Persist Config
const persistConfig = {
    key: "root",
    storage,
};

// Combine Reducers
const rootReducer = combineReducers({
    notes: notesReducer,
    tags: tagsReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store Configuration
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persistor oluşturulması
export const persistor = persistStore(store);

export default store;
