import { plainToClass, Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, Min, validate } from 'class-validator';
import { BaseEntity } from './BaseEntitiy';

export class Movie extends BaseEntity {


    @Type(() => String)
    @IsNotEmpty({ message: '电影名称不能为空' })
    public name: string;

    @Type(() => String)
    @IsNotEmpty({ message: '电影类型不能为空' })
    @IsArray({ message: "电影类型必须位数组" })
    @ArrayMinSize(1, { message: '电影类型至少有1种' })
    public types: string[];

    @Type(() => String)
    @IsNotEmpty({ message: '上映地区不能为空' })
    @IsArray({ message: "上映地区必须位数组" })
    @ArrayMinSize(1, { message: '上映地区至少有1种' })
    public areas: string[];

    @Type(() => Number)
    @IsNotEmpty({ message: '电影时长不能为空' })
    @IsInt({ message: '电影时长必须为整数' })
    @Min(1, { message: '电影时长最短一分钟' })
    public timeLong: number;

    @Type(() => Boolean)
    @IsNotEmpty({ message: '是否热映不能为空' })
    public isHot: boolean;

    @Type(() => Boolean)
    @IsNotEmpty({ message: '是否即将上映不能为空' })
    public isComing: boolean;

    @Type(() => Boolean)
    @IsNotEmpty({ message: '是否为经典影片不能为空' })
    public isClassic: boolean;

    @Type(() => String)
    public description?: string;

    @Type(() => String)
    public poster?: string;

    public static transform(plainObject: object): Movie {
        return super.baseTransform(Movie, plainObject);
    }
}