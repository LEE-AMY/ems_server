import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class Term extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    termNo: string

    @Type(() => Number)
    startDate: number

    @Type(() => Number)
    endDate: number


    @Length(5, 10)
    @Type(() => String)
    dbdNo: string

    @IsIn([0, 1, 2])
    @Type(() => Number)
    termStatus: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}