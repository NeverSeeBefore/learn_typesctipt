import { IMovie, ISearchCondition, MovieService } from "../../serveice/MovieService";
import { IAction } from "./ActionTypes";
import { ThunkAction } from "redux-thunk"
import { IRootState } from "../reducers";
import { SwitchType } from "../../components/MovieTable/types";

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

export type changeSwitchActionType = IAction<'movie_switch_change', {
    type: SwitchType;
    newVal: boolean;
    id: string;
}>
function createChangeSwitchAction(type: SwitchType, newVal: boolean, id: string)
    : changeSwitchActionType {
    return {
        type: 'movie_switch_change',
        payload: {
            type,
            newVal,
            id
        }
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

function changeSwitch(type: SwitchType, newVal: boolean, id: string)
    //  返回值类型 ，整个redux的state，额外数据，电影actions
    : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        // 1、设置加载状态
        dispatch(createSetIsLoadingAction(true));
        // 2. 改变本地数据
        dispatch(createChangeSwitchAction(type, newVal, id));
        // 3. 发送请求修改
        const resp = await MovieService.editMovie(id, {
            [type]: newVal
        });
        console.log('change switch result ',resp);
        // 4. 如果出错改回原状态
        // 5. 关闭加载状态
        dispatch(createSetIsLoadingAction(false));
    }
}


export type MovieActions = setConditionActionType | setIsLoadingActionType | saveMovieActionType | deleteMovieActionType | changeSwitchActionType;
const MovieAction = {
    createSaveMovieAction,
    createDeleteMovieAction,
    createSetIsLoadingAction,
    createSetConditionAction,
    createChangeSwitchAction,
    fetchMovies,
    deleteMovie,
    changeSwitch
}
export default MovieAction;