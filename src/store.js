import {createStore, applyMiddleware, compose} from "redux";
import { rootReducers } from "./reducers";
import createSagaMiddleware from 'redux-saga'
import rootSagas from "./sagas";
const sagaMiddleware = createSagaMiddleware()

const enhanced = [applyMiddleware(sagaMiddleware)];

process.env.NODE_ENV === 'development' &&
window.__REDUX_DEVTOOLS_EXTENSION__ &&
enhanced.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(
    rootReducers,
    compose(...enhanced)
);
sagaMiddleware.run(rootSagas)


export default store;
