import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { status } from "../../types";

/**
 * 选课记录类
 */
export class OptCourse extends BaseEntity {

    @IsNotEmpty({ message: "课程ID不能为空" })
    crsID: string

    @IsNotEmpty({ message: "学期ID不能为空" })
    termID: string

    @IsNotEmpty({ message: "选课学生ID不能为空" })
    stuID: string

    @Min(0)
    @Max(9999)
    @Type(() => Number)
    grade: number = 0

    @Min(0)
    @Max(9999)
    @Type(() => Number)
    score: number = 0

    @IsIn(status)
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}

