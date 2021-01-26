import Mongoose from "mongoose";
import { Movie } from "../entities/Movie";

// 电影接口， 继承Mongoose.Document 提供id等属性，save函数等使用方法，继承Movie 提供类型检查
export interface IMovie extends Movie, Mongoose.Document { };

// 电影schema
const MovieSchema = new Mongoose.Schema<IMovie>(
    {
        name: String,
        types: [String],
        areas: [String],
        timeLong: Number,
        isComing: Boolean,
        isClassic: Boolean,
        isHot: Boolean,
        description: String,
        poster: String,
    },
    {
        versionKey: false
    }
)

export default Mongoose.model<IMovie>("Movie", MovieSchema);