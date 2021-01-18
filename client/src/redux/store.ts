import { createStore, applyMiddleware, compose } from "redux";
import { RootReducer, IRootState } from "./reducers";
import {createLogger} from "redux-logger";
// import createSagaMiddleware from 'redux-saga';
// import sagaTask from "./saga";
import thunk, { ThunkMiddleware } from "redux-thunk";

const logger = createLogger({
    collapsed: true
})
// const sagaMiddleWare = createSagaMiddleware();
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const store = createStore(RootReducer, composeEnhancers(applyMiddleware(sagaMiddleWare,logger)));
export const store = createStore(RootReducer, applyMiddleware(thunk as ThunkMiddleware<IRootState>, logger));
// sagaMiddleWare.run(sagaTask)