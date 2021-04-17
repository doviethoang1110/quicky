import {HIDE_LOADING, SHOW_LOADING} from "../constants";

let initialState = false;

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            return action.payload;
        case HIDE_LOADING:
            return action.payload;
        default:
            return state;
    }
}