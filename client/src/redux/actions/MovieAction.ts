import { IMovie, ISearchCondition, MovieService } from "../../serveice/MovieService";
import { IMovieCondition } from "../reducers/MovieReducer";
import { IAction } from "./ActionTypes";
import { ThunkAction } from "redux-thunk"
import { IRootState } from "../reducers";

export type saveMovieActionType = IAction<'movie_save', {
    movies: IMovie[],
    total: number
}>
function createSaveMovieAction(movies: IMovie[], total: number): saveMovieActionType {
    return {
        type: "movie_save",
        payload: {
            movies,
            total
        }
    }
}

export type setIsLoadingActionType = IAction<'set_isLoading', boolean>
function createSetIsLoadingAction(isLoading: boolean): setIsLoadingActionType {
    return {
        type: "set_isLoading",
        payload: isLoading
    }
}

export type setConditionActionType = IAction<'set_condition', ISearchCondition>
function createSetConditionAction(condition: ISearchCondition): setConditionActionType {
    return {
        type: "set_condition",
        payload: condition
    }
}

export type deleteMovieActionType = IAction<'movie_detele', string>
function createDeleteMovieAction(id: string): deleteMovieActionType {
    return {
        type: "movie_detele",
        payload: id
    }
}

// 根据条件获取电影数据
function fetchMovies(condition: ISearchCondition)
    //  返回值类型 ，整个redux的state，额外数据，电影actions
    : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        // 1、设置加载状态
        dispatch(createSetIsLoadingAction(true));
        // 2. 设置条件
        dispatch(createSetConditionAction(condition));
        // 3. 得到最终查询条件
        const curCondition = getState().movie.condition;
        // 4. 查询电影
        const resp = await MovieService.getMovies(curCondition);
        console.log(resp);
        // 5. 更改仓库数据
        dispatch(createSaveMovieAction(resp.data, resp.count))
        // 6. 关闭加载状态
        dispatch(createSetIsLoadingAction(false));
    }
}

// 根据条件获取电影数据
function deleteMovie(id: string)
    //  返回值类型 ，整个redux的state，额外数据，电影actions
    : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        dispatch(createSetIsLoadingAction(true));

        await MovieService.deleteMovie(id);

        dispatch(createDeleteMovieAction(id));

        dispatch(createSetIsLoadingAction(false));
    }
}

export type MovieActions = setConditionActionType | setIsLoadingActionType | saveMovieActionType | deleteMovieActionType;
export default {
    createSaveMovieAction,
    createDeleteMovieAction,
    createSetIsLoadingAction,
    createSetConditionAction,
    fetchMovies,
    deleteMovie
}