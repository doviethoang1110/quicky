import { all } from "redux-saga/effects";
import userWatcher from "./user.saga";

const rootSagas = function* (){
    yield all([
        userWatcher(),
    ])
}

export default rootSagas;