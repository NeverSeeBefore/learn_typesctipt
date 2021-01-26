import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

type ClassConstructor<T> = new (...args: any[]) => T;

export abstract class BaseEntity {
    public async check(skipMissing: boolean = false): Promise<string[]> {
        const errors = await validate(this, { skipMissingProperties: skipMissing });
        const temp = errors.map(e => e.constraints ? Object.values(e.constraints) : '');
        const res: string[] = [];
        temp.forEach(it => res.push(...it));
        return res;
    }

    public static baseTransform<T>(cls: ClassConstructor<T>, plainObject: object): T {
        if (plainObject instanceof cls) return plainObject;
        return plainToClass(cls, plainObject);
    }
}