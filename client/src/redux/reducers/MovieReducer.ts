import { ISearchCondition } from "../../services/CommonTypes";
import { IMovie } from "../../services/MovieService";
import { IAction } from "../actions/ActionTypes";
import { MovieAction, SaveMoviesAction, ConditionAction, IsLoadingAction, DeleteAction } from "../actions/MovieAction";
import { Reducer } from "react";

export type IMovieCondition = Required<ISearchCondition>

export interface IMovieState {
    /**
     * 电影数组
     */
    data: IMovie[]
    /**
     * 查询条件
     */
    condition: IMovieCondition,
    /**
     * 总记录数
     */
    total: number,
    /**
     * 是否正在加载
     */
    isLoading: boolean,
    /**
     * 总页数
     */
    totalPage: number
}

// function saveMovie(state: IMovieState, action: SaveMoviesAction): IMovieState{

// }

const saveMovie: Reducer<IMovieState, SaveMoviesAction> = function (prevState, action) {
    return Object.assign({}, prevState, {
        data: action.payload.movies,
        total: action.payload.total,
        totalPage: Math.ceil(action.payload.total / prevState.condition.limit)
    })
}

const setCondition: Reducer<IMovieState, ConditionAction> = function (prevState, action) {
    const newSate = {
        ...prevState,
        condition: {
            ...prevState.condition,
            ...action.payload
        },
    }
    newSate.totalPage = Math.ceil(newSate.total / newSate.condition.limit);
    return newSate;
}
const setIsLoading: Reducer<IMovieState, IsLoadingAction> = function (prevState, action) {
    return {
        ...prevState,
        isLoading: action.payload
    }
}
const deleteMovie: Reducer<IMovieState, DeleteAction> = function (prevState, action) {
    return {
        ...prevState,
        data: prevState.data.filter(m => m._id !== action.payload),
        total: prevState.total - 1,
        totalPage: (prevState.total - 1) / prevState.condition.limit
    }
}

const defaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ""
    },
    total: 0,
    isLoading: false,
    totalPage: 0
}

export default function MovieReducer(state: IMovieState = defaultState, action: MovieAction) {
    switch (action.type) {
        case "movie_save":
            return saveMovie(state, action);
        case "movie_delete":
            return deleteMovie(state, action);
        case "movie_is_loading":
            return setIsLoading(state, action);
        case "movie_condition":
            return setCondition(state, action);
        default:
            return state;
    }
}