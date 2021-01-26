import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { BaseEntity } from "./BaseEntitiy";

export class SearchCondition extends BaseEntity {

    @Type(() => Number)
    @IsInt({ message: "页码必须为整数" })
    @Min(1, { message: "页码最小为1" })
    public page: number = 1;

    @Type(() => Number)
    @IsInt({ message: "页容量必须为整数" })
    @Min(1, { message: "页容量最小为1" })
    public limit: number = 10;

    @Type(() => String)
    public key: string = '';

    public static transform(plainObject: object): SearchCondition {
        return super.baseTransform(SearchCondition, plainObject);
    }
}