import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class Description extends BaseEntity {

    @Type(() => String)
    descTitle: string = ""

    @Type(() => String)
    descSummary: string = ""

    @Type(() => String)
    descDetail?: string = ""

    @Type(() => String)
    author: string = ""

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}