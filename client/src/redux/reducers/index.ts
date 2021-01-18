import { combineReducers } from "redux";
import MovieReducer, { IMovieState } from "./MovieReducer";

export interface IRootState {
    movie: IMovieState,
}

export const RootReducer = combineReducers({
    movie: MovieReducer
})
