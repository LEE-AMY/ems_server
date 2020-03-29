import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class CourseTab extends BaseEntity {
    @Length(1, 10)
    @Type(() => String)
    crsNo: string

    @Length(5, 10)
    @Type(() => String)
    tchNo: string

    @Length(5, 10)
    @Type(() => String)
    crsCode: string

    @Length(5, 10)
    @Type(() => String)
    termNo: string

    @Length(1, 100)
    @Type(() => String)
    useRoom: string

    @Min(0)
    @Max(9999)
    @Type(() => Number)
    total: number

    @Min(0)
    @Max(9999)
    @Type(() => Number)
    surplus: number

    @IsIn([0, 1, 2, 3])
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}

