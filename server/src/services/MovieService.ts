import { plainToClass } from "class-transformer";
import { MovieModel } from "../db";
import { IMovie } from "../db/MovieSchema";
import { ISearchResult } from "../entities/CommonTypes";
import { Movie } from "../entities/Movie";
import { SearchCondition } from "../entities/SearchCondition";

export class MovieService {
    public static async add(movie: object): Promise<IMovie | string[]> {
        // 1. 类型转换
        const oMovie = Movie.transform(movie);
        // 2. 数据验证
        const errors = await oMovie.check();
        if (errors.length > 0) return errors;
        // 3. 添加到数据库
        return await MovieModel.create(movie);
    }

    public static async edit(id: string, movie: object): Promise<any> {
        // 1. 类型转换
        const oMovie = Movie.transform(movie);
        // 2. 数据验证
        const errors = await oMovie.check(true);
        if (errors.length > 0) return errors;
        // 3. 修改数据库
        return await MovieModel.updateOne({ _id: id }, movie);
    }

    public static async delete(id: string): Promise<void> {
        return await MovieModel.deleteOne({ _id: id });
    }

    public static async findById(id: string): Promise<IMovie | null> {
        const result = await MovieModel.findById({ _id: id });
        return result;
    }

    public static async find(condition: object): Promise<ISearchResult<IMovie>> {

        const res:ISearchResult<IMovie> = {
            count: 0,
            data: [],
            errors: []
        };
        // 1. 类型转换
        const oCondition = SearchCondition.transform(condition);
        // 2. 数据验证
        res.errors = await oCondition.check();

        if (res.errors.length > 0) {
            return res;
        }

        // 3. 查询
        res.data = await MovieModel.find({
            name: {
                $regex: new RegExp(oCondition.key)
            }
        }).skip((oCondition.page - 1) * oCondition.limit).limit(oCondition.limit);

        res.count = await MovieModel.find({
            name: {
                $regex: new RegExp(oCondition.key)
            }
        }).countDocuments();

        return res;
    }
}