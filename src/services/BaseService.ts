import { ClassType } from "class-transformer/ClassTransformer";

export abstract class BaseService {
    public static async add<T>(cls: ClassType<T>) {
        console.log("add",)
    }
}