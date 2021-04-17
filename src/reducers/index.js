import {combineReducers} from "redux";
import {loadingReducer} from "./loading.reducer";
import {userReducer} from "./user.reducer";
import {modalReducer} from "./modal.reducer";

export const rootReducers = combineReducers({
    loadingReducer,
    userReducer,
    modalReducer
});