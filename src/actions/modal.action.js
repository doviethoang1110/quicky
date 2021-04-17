import {HIDE_MODAL, SHOW_MODAL} from "../constants";

export const showModal = (payload) => ({
    type: SHOW_MODAL,
    payload
});

export const hideModal = () => ({
    type: HIDE_MODAL
});
