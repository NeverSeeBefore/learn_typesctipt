import { IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
import { BaseEntity } from "./BaseEntity";

export class SearchCondition extends BaseEntity{
    // 页码
    @IsInt({message: "页码必须是整数"})
    @Min(1, {message: "页码最小为1"})
    @Type(() => Number)
    public page: number = 1;
    // 页容量
    @IsInt({message: "页容量必须是整数"})
    @Min(1, {message: "页容量最小为1"})
    @Type(() => Number)
    public limit: number = 10;
    // 关键字
    @Type(() => String)
    public key: string = "";

    public static transform(plainObj: object): SearchCondition {
        return super.baseTransform(SearchCondition, plainObj);
    }
}