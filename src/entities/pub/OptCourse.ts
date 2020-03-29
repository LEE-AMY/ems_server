import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class OptCourse extends BaseEntity {
    @Length(1, 10)
    @Type(() => String)
    optNo: string

    @Length(5, 10)
    @Type(() => String)
    crsNo: string

    @Length(1, 10)
    @Type(() => String)
    termNo: string

    @Length(5, 10)
    @Type(() => String)
    stuNo: string

    @Min(0)
    @Max(9999)
    @Type(() => Number)
    grade: number = 0

    @Min(0)
    @Max(9999)
    @Type(() => Number)
    score: number = 0

    @IsIn([0, 1, 2, 3])
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}

