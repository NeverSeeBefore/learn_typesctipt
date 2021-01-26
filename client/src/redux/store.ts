import { applyMiddleware, createStore } from "redux";
import { IRootState, RootReducer } from "./reducers";
import logger from "redux-logger";
import thunk, { ThunkMiddleware } from "redux-thunk";


export const store = createStore(
    RootReducer,
    applyMiddleware(thunk as ThunkMiddleware<IRootState>, logger)
);

// redux-thunk

// 1. 应用中间件
// applyMiddleWare(thunk as ThunkMiddleWare<IRootState>)

// 2. 创建 异步action
// function deleteMovie(id: string)
//     : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
//     return async (dispatch, getState) => {
//         dispatch(createSetIsLoadingAction(true));
//         await MovieService.deleteMovie(id);
//         dispatch(createDeleteMovieAction(id));
//         dispatch(createSetIsLoadingAction(false));
//     }
// }

// 3. 触发action
// store.dispatch(deleteMovie('id'));