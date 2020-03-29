import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class Time extends BaseEntity {

    @Length(1, 10)
    @Type(() => String)
    timeNo: string

    @Length(1, 20)
    @Type(() => String)
    timeName: string

    @Length(8, 20)
    @Type(() => String)
    timeStart: string

    @Length(8, 20)
    @Type(() => String)
    timeEnd: string

    @Length(1, 10)
    @Type(() => String)
    termNo: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}