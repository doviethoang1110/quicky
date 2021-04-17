import {USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, USER_UPDATE_FAILURE, USER_UPDATE_SUCCESS} from "../constants";
import CookieService from "../utils/cookieService";

const initialState = CookieService.get("access_token") ? JSON.parse(localStorage.getItem("user")) : null;

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {...action.payload};
        case USER_LOGOUT_SUCCESS:
            return null;
        case USER_UPDATE_SUCCESS:
            return {...state, ...action.payload};
        case USER_UPDATE_FAILURE:
            return state;
        default:
            return state;
    }
}