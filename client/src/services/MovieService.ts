import axios from "axios";
import { IResponseData, IResponseError, ISearchCondition, IResponsePageData } from "./CommonTypes";

export interface IMovie {
    _id?: string;
    name: string;
    types: string[];
    areas: string[];
    timelong: number;
    isHot: boolean;
    isComing: boolean;
    isClassic: boolean;
    description: string;
    poster: string;
}

export class MovieService {
    public static async add(movie: IMovie): Promise<IResponseData<IMovie> | IResponseError> {
        const result = await axios.post("/api/movie", movie);
        // console.log("axios result", result);
        return result.data;
    }
    public static async edit(id: string, movie: IMovie): Promise<IResponseData<IMovie> | IResponseError> {
        const result = await axios.put("/api/movie/" + id, movie);
        // console.log("axios result", result);
        return result.data;
    }
    public static async delete(id: string): Promise<IResponseData<true> | null> {
        const result = await axios.delete("/api/movie/" + id);
        console.log("axios result", result);
        return result.data;
    }
    public static async getMovieById(id: string): Promise<IResponseData<IMovie | null>> {
        const result = await axios.get("/api/movie/" + id);
        console.log("axios result", result);
        return result.data;
    }
    public static async getMovies(condition: ISearchCondition): Promise<IResponsePageData<IMovie>> {
        const result = await axios.get("/api/movie", {
            params: condition
        });
        console.log("axios result", result);
        return result.data;
    }
}