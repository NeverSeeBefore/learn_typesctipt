import { Movie } from "../entities/Movie";
import { IMovie } from "../db/MovieSchema";
import { MovieModel } from "../db";
import { SearchCondition } from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonTypes";



export class MovieService {
    public static async add(movie: Movie): Promise<IMovie | string[]> {
        // 转换类型
        movie = Movie.transform(movie);
        // 类型验证
        const errors = await movie.check();
        if (errors.length > 0) {
            return errors;
        }
        const result = await MovieModel.create(movie);
        return result;
    }
    public static async edit(id: string, movie: Movie): Promise<string[]> {
        // 转换类型
        movie = Movie.transform(movie);
        // 类型验证
        const errors = await movie.check(true);
        if (errors.length > 0) {
            return errors;
        }
        const result = await MovieModel.updateOne({ _id: id }, movie);
        return result;
    }
    public static async delete(id: string): Promise<any> {
        return await MovieModel.deleteOne({ _id: id })
    }
    public static async findById(id: string): Promise<IMovie | null> {
        return await MovieModel.findById(id);
    }
    public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
        // 转换类型
        condition = SearchCondition.transform(condition);
        // 类型验证
        const errors = await condition.check(true);
        if (errors.length > 0) {
            return {
                count: 0,
                data: [],
                errors
            }
        }
        const movies = await MovieModel.find({
            name: { $regex: new RegExp(condition.key) }
        }).skip((condition.page - 1) * condition.limit).limit(condition.limit);
        const count = await MovieModel.find({
            name: {$regex: new RegExp(condition.key)}
        }).countDocuments();
        return { count, errors: [], data: movies};
    }
}