import { plainToClass } from "class-transformer"
import { ClassType } from "class-transformer/ClassTransformer";
import { validate } from "class-validator";


export abstract class BaseEntity {

    public async validateThis(skipMissing = false): Promise<string[]> {
        const err = await validate(this, { skipUndefinedProperties: skipMissing });
        const tmp = err.map(e => Object.values(e.constraints));
        const result: string[] = [];

        tmp.forEach(t => result.push(...t))
        return result
    }

    /**
     * 将一个平面对象转换为ClassType<T>类的对象
     * @param cls 转成目标类对象
     * @param plainObj 平面对象
     */
    protected static baseTransform<T>(cls: ClassType<T>, plainObj: object): T {
        if (plainObj instanceof cls) {
            return plainObj
        }

        return plainToClass(cls, plainObj);
    }

}