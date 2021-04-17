import {HIDE_MODAL, SHOW_MODAL} from "../constants";

let initialState = {
    name: "",
    show: false
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return action.payload;
        case HIDE_MODAL:
            return {name: "", show: false};
        default:
            return state;
    }
}