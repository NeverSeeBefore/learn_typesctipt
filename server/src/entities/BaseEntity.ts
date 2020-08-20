import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export abstract class BaseEntity {
    public async check(skipMissing: boolean = false): Promise<string[]> {
        const errors = await validate(this, { skipUndefinedProperties: skipMissing });
        const temp: string[] = [];
        errors.forEach(e => {
            // tslint:disable-next-line: no-unused-expression
            e.constraints && temp.push(...Object.values(e.constraints))
        })
        return temp;
    }

    protected static baseTransform<T>(cls: ClassType<T>, plainObj: object): T {
        if (plainObj instanceof cls) {
            return plainObj;
        }
        return plainToClass(cls, plainObj)
    }
}