import {call, put, takeEvery, delay} from "redux-saga/effects";
import axiosService from "../utils/axiosService";
import {FACEBOOK_LOGIN, RECORD_EXIST, USER_LOGIN, USER_LOGOUT, USER_REFRESH_TOKEN, USER_UPDATE} from "../constants";
import cookieService from "../utils/cookieService";
import {hideLoading, showLoading} from "../actions/loading.action";
import _ from 'lodash';
import {
    actionLoginSuccess,
    actionLogoutSuccess,
    actionRefreshToken, actionUpdateUserFailure,
    actionUpdateUserSuccess
} from "../actions/user.action";
import {decode} from "jsonwebtoken";
import socket from "../utils/socket";
import {redirect} from "../utils/history";
import {showToast} from "../plugins/sweetAlert";

function* setToken({accessToken, refreshToken, user}) {
    yield cookieService.set("access_token", accessToken, 3600);
    yield cookieService.set("refresh_token", refreshToken, 3600 * 24 * 7);
    localStorage.setItem("user", JSON.stringify(user));
    yield put(actionLoginSuccess(user));
    yield delay(1000);
    yield redirect('/chats');
}

const login = (body) => axiosService('auth/sign-in', 'POST', body);
const authFacebook = (body) => axiosService('auth/facebook', 'POST', body);
const getNewAccessToken = (body) => axiosService('users/get-new-token', 'POST', body);
const editUser = (id, body) => axiosService(`users/${id}`, 'PUT', body)


function* loginRequest(action) {
    yield put(showLoading());
    try {
        const {email, password} = action.payload;
        const response = yield call(login, {email, password});
        if (!response.data.success) {
            showToast('error', response.data.message);
            yield put(hideLoading());
        }
        else {
            const {accessToken, refreshToken} = response.data.result;
            const {user} = yield decode(accessToken);
            socket.emit("SET_CLIENT_ID", user._id);
            yield setToken({accessToken, refreshToken, user});
            yield put(hideLoading());
        }
    } catch (error) {
        console.log('saga login', error);
        const errors = error?.response?.data;
        if (errors) document.getElementById("errorMsg").innerText = errors;
        yield put(hideLoading());
    }
}

function* facebookLogin(action) {
    yield put(showLoading());
    try {
        const response = yield call(authFacebook, action.payload);
        const {accessToken, refreshToken} = response.data.result;
        const {user} = yield decode(accessToken);
        socket.emit("SET_CLIENT_ID", user._id);
        yield setToken({accessToken, refreshToken, user});
        yield put(hideLoading());
    } catch (error) {
        console.log(error);
        const errors = error?.response?.data;
        if (errors) document.getElementById("errorMsg").innerText = errors;
        yield put(hideLoading());
    }
}

function* refreshToken(action) {
    yield put(showLoading());
    try {
        const response = yield call(getNewAccessToken, action.payload);
        yield cookieService.set("token", response.data.token, 3600);
        yield put(hideLoading());
    } catch (error) {
        console.log(error);
        yield put(hideLoading());
    }
}

function* logoutRequest() {
    yield put(showLoading());
    try {
        yield cookieService.remove("access_token");
        yield cookieService.remove`refresh_token`;
        localStorage.removeItem("user");
        yield put(actionLogoutSuccess());
        yield delay(1000);
        yield put(hideLoading());
    } catch (error) {
        console.log('saga logout', error);
        yield put(hideLoading());
    }
}

function* userUpdate(action) {
    yield put(showLoading());
    try {
        const response = yield call(editUser, action.payload.id, _.omit(action.payload, ['id']));
        if (!response.data.success) {
            showToast('error', response.data.message);
            yield put(hideLoading());
        }
        else {
            yield delay(500);
            yield put(actionUpdateUserSuccess(action.payload));
            localStorage.setItem("user", JSON.stringify(response.data.result));
            yield put(hideLoading());
        }
    } catch (e) {
        console.log('error saga user update', e);
        yield put(actionUpdateUserFailure())
        yield put(hideLoading());
    }
}

function* userWatcher() {
    yield takeEvery(USER_REFRESH_TOKEN, refreshToken);
    yield takeEvery(USER_LOGIN, loginRequest);
    yield takeEvery(USER_LOGOUT, logoutRequest);
    yield takeEvery(FACEBOOK_LOGIN, facebookLogin);
    yield takeEvery(USER_UPDATE, userUpdate);
}

export default userWatcher;