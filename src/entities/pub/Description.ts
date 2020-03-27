import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class Description extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    descCode: string

    @Length(0, 100)
    @Type(() => String)
    descTitle: string

    @Length(0, 200)
    @Type(() => String)
    descSummary: string

    @Type(() => String)
    descDetail: string

    @Length(0, 20)
    @Type(() => String)
    author: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}