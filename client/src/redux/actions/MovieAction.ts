import "redux"
import { IMovie, MovieService } from "../../services/MovieService";
import { IAction } from "./ActionTypes";
import { ISearchCondition } from "../../services/CommonTypes";
import { ThunkAction } from "redux-thunk";
import { IRootState } from "../reducers";

export type SaveMoviesAction = IAction<"movie_save", { movies: IMovie[], total: number }>

function saveMoviesAction(movies: IMovie[], total: number): SaveMoviesAction {
    return {
        type: "movie_save",
        payload: {
            movies,
            total
        }
    }
}
export type IsLoadingAction = IAction<"movie_is_loading", boolean>

function setIsLoading(isLoading: boolean): IsLoadingAction {
    return {
        type: "movie_is_loading",
        payload: isLoading
    }
}
export type ConditionAction = IAction<"movie_condition", ISearchCondition>

function setCondition(condition: ISearchCondition): ConditionAction {
    return {
        type: "movie_condition",
        payload: condition
    }
}
export type DeleteAction = IAction<"movie_delete", string>

function deleteAction(id: string): DeleteAction {
    return {
        type:   "movie_delete",
        payload: id
    }
}

export type MovieAction = SaveMoviesAction | IsLoadingAction | ConditionAction | DeleteAction;

// 获取电影数据
function fetchMovies(condition: ISearchCondition): ThunkAction<Promise<void>, IRootState, any, MovieAction> {
    return async (dispatch, getState) => {
        // 设置加载状态
        dispatch(setIsLoading(true));
        // 设置条件
        dispatch(setCondition(condition));
        // 获取服务数据
        const result = await MovieService.getMovies(getState().movie.condition);
        // 设置电影数据
        dispatch(saveMoviesAction(result.data, result.total));
        // 取消加载状态
        dispatch(setIsLoading(false));
    }
}
// 删除电影
function deleteMovie(id: string): ThunkAction<Promise<void>, IRootState, any, MovieAction> {
    return async dispatch => {
        dispatch(setIsLoading(true));
        await MovieService.delete(id);
        dispatch(deleteAction(id));
        dispatch(setIsLoading(false));
    }
}

export default {
    saveMoviesAction,
    setIsLoading,
    setCondition,
    deleteAction,
// 副作用 action
    fetchMovies,
    deleteMovie
}