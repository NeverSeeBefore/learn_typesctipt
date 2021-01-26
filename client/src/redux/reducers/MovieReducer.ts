import { IMovie, ISearchCondition } from "../../serveice/MovieService";
import { deleteMovieActionType, MovieActions, saveMovieActionType, setConditionActionType, setIsLoadingActionType } from "../actions/MovieAction";
import { IReducer } from './ReducerTypes';

export type IMovieCondition = Required<ISearchCondition>

export interface IMovieState {
    movies: IMovie[],
    condition: IMovieCondition,
    movieCount: number,
    isLoading: boolean,
    totalPage: number
}

const defaultState: IMovieState = {
    movies: [],
    condition: {
        page: 1,
        limit: 5,
        key: ''
    },
    movieCount: 0,
    isLoading: false,
    totalPage: 0
};

export default function MovieReducer(state: IMovieState = defaultState, action: MovieActions) {
    switch (action.type) {
        case "movie_save":
            return saveMovie(state, action);
        case "movie_detele":
            return deleteMovie(state, action);
        case "set_condition":
            return setCondition(state, action);
        case "set_isLoading":
            return setIsLoading(state, action);
        default:
            return state;
    }
}

const saveMovie: IReducer<IMovieState, saveMovieActionType> = (prevState, action) => {
    return Object.assign({}, prevState, {
        movies: action.payload.movies,
        movieCount: action.payload.total,
        totalPage: Math.ceil(action.payload.total / prevState.condition.limit)
    })
}

const setCondition: IReducer<IMovieState, setConditionActionType> = (prevState, action) => {
    const newState = {
        ...prevState,
        condition: {
            ...prevState.condition,
            ...action.payload
        }
    }
    newState.totalPage = Math.ceil(newState.movieCount / newState.condition.limit);
    return newState;
}

const setIsLoading: IReducer<IMovieState, setIsLoadingActionType> = (prevState, action) => {
    return {
        ...prevState,
        isLoading: action.payload
    }
}

const deleteMovie: IReducer<IMovieState, deleteMovieActionType> = (prevState, action) => {
    let flag = false;
    const movies = prevState.movies.filter(m => {
        if (flag) return true;
        flag = m._id === action.payload;
        return !flag
    });
    return {
        ...prevState,
        movies: movies,
        movieCount: flag ? prevState.movieCount - 1 : prevState.movieCount,
        totalPage: Math.ceil(prevState.movieCount - 1 / prevState.condition.limit)
    }
}

