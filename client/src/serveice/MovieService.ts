import axios from 'axios';

export interface IMovie {
    _id?: string;
    name: string;
    types: string[];
    areas: string[];
    timeLong: number;
    isHot: boolean;
    isComing: boolean;
    isClassic: boolean;
    description?: string;
    poster?: string;
}

export interface IResp<T> {
    err: string,
    data: T,
}

export interface ISearchCondition {
    page?: number;
    limit?: number;
    key?: string;
}

export class MovieService {
    public static async addMovie(movie: IMovie): Promise<IResp<IMovie>> {
        const { data } = await axios.post("/api/movie", movie)
        // console.log(data);
        return data;
    }
    // "6008f2fc593890c1afe13925"
    public static async getMovie(id: string): Promise<IResp<IMovie>> {
        const { data } = await axios.get("/api/movie/" + id);
        // console.log(data);
        return data;
    }
    public static async getMovies(condition: ISearchCondition): Promise<{ data: IMovie[], count: number }> {
        const { data } = await axios.get("/api/movie", { params: condition });
        // console.log(data);
        return data.data;
    }
    public static async editMovie(id: string, movie: IMovie): Promise<IResp<any>> {
        const { data } = await axios.put("/api/movie/" + id, movie);
        // console.log(data);
        return data;
    }
    public static async deleteMovie(id: string): Promise<IResp<any>> {
        const { data } = await axios.delete("/api/movie/" + id);
        // console.log(data);
        return data;
    }
}