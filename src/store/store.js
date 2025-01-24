// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./rootReducer";


// const store = configureStore({
//     reducer: rootReducer
// })


// export default store;


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage for web)
import rootReducer from "./rootReducer";

// Configure persistence settings
const persistConfig = {
  key: "root", // Key for localStorage
  storage, // Storage type
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor for the store
export const persistor = persistStore(store);

export default store;
