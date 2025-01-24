import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./feature/authReducer"

const rootReducer = combineReducers({
      auth: authReducer
})

export default rootReducer;