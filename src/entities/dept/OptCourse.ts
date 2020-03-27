import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class OptCourse extends BaseEntity {
    @Length(5, 10)
    @Type(() => String)
    optNo: string

    @Length(5, 10)
    @Type(() => String)
    crsNo: string

    @Length(5, 10)
    @Type(() => String)
    stuNo: string

    @Min(0)
    @Max(150)
    @Type(() => Number)
    grade: number

    @IsIn([0, 1, 2])
    @Type(() => Number)
    crsStatus: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}

