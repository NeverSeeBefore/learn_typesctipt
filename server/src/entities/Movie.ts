import "class-validator";
import { IsNotEmpty, ArrayNotEmpty, IsInt, Min, IsArray, validate } from "class-validator";
import { Type } from "class-transformer";
import { BaseEntity } from "./BaseEntity";

export class Movie extends BaseEntity {
    @IsNotEmpty({ message: "电影名称不能为空" })
    @Type(() => String)
    public name: string;

    @ArrayNotEmpty({ message: "电影类型至少有一个" })
    @IsArray({ message: "电影类型必须是数组" })
    @Type(() => String) // 这里只需要设置每一项的类型
    public types: string[];

    @ArrayNotEmpty({ message: "上映地区至少有一个" })
    @IsArray({ message: "上映地区必须是数组" })
    @Type(() => String)
    public areas: string[];

    @IsNotEmpty({ message: "时长不能为空" })
    @IsInt({ message: "时长必须是整数" })
    @Min(1, { message: "时长最短一分钟" })
    @Type(() => Number)
    public timelong: number;

    @IsNotEmpty({ message: "是否热映不能为空" })
    @Type(() => Boolean)
    public isHot: boolean;

    @IsNotEmpty({ message: "是否即将上映不能为空" })
    @Type(() => Boolean)
    public isComing: boolean;

    @IsNotEmpty({ message: "是否为经典影片不能为空" })
    @Type(() => Boolean)
    public isClassic: boolean;

    // 简介
    @Type(() => String)
    public description?: string;
    // 海报
    @Type(() => String)
    public poster?: string;

    public static transform(plainObj: object): Movie {
        return super.baseTransform(Movie, plainObj);
    }
}

