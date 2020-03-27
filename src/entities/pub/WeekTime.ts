import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class WeekTime extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    weekNo: string

    @Type(() => Number)
    startDate: number

    @Type(() => Number)
    endDate: number

    @Length(5, 10)
    @Type(() => String)
    monNo: string

    @Length(5, 10)
    @Type(() => String)
    tueNo: string

    @Length(5, 10)
    @Type(() => String)
    wedNo: string

    @Length(5, 10)
    @Type(() => String)
    thurNo: string

    @Length(5, 10)
    @Type(() => String)
    firNo: string

    @Length(5, 10)
    @Type(() => String)
    satNo: string

    @Length(5, 10)
    @Type(() => String)
    sunNo: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}