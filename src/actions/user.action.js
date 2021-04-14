import {
    FACEBOOK_LOGIN,
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_LOGOUT_SUCCESS,
    USER_REFRESH_TOKEN, USER_UPDATE, USER_UPDATE_FAILURE, USER_UPDATE_SUCCESS
} from "../constants";

export const actionLogin = (user) => {
    return {
        type: USER_LOGIN,
        payload: user
    }
}

export const actionFacebookLogin = (user) => {
    return {
        type: FACEBOOK_LOGIN,
        payload: user
    }
}

export const actionLoginSuccess = (user) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: user
    }
}

export const actionRefreshToken = (token) => {
    return {
        type: USER_REFRESH_TOKEN,
        payload: token
    }
}

export const actionLogout = () => {
    return {
        type: USER_LOGOUT,
        payload: null
    }
}

export const actionLogoutSuccess = () => {
    return {
        type: USER_LOGOUT_SUCCESS,
        payload: null
    }
}

export const actionUpdateUser = (user) => {
    return {
        type: USER_UPDATE,
        payload: user
    }
}

export const actionUpdateUserSuccess = (user) => {
    return {
        type: USER_UPDATE_SUCCESS,
        payload: user
    }
}

export const actionUpdateUserFailure = () => {
    return {
        type: USER_UPDATE_FAILURE
    }
}