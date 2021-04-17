import {HIDE_LOADING, SHOW_LOADING} from "../constants";

export const showLoading = () => ({
    type: SHOW_LOADING,
    payload: true
});

export const hideLoading = () => ({
    type: HIDE_LOADING,
    payload: false
});
