import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn, IsNotEmpty, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { crsStatus } from "../../types";

export class CourseTab extends BaseEntity {

    @IsNotEmpty({ message: "上课教师ID不能为空" })
    tchID: string

    @IsNotEmpty({ message: "课程ID不能为空" })
    crsID: string

    @IsNotEmpty({ message: "学期ID不能为空" })
    termID: string

    @IsNotEmpty({ message: "教室ID不能为空" })
    useRoom: string

    @IsInt({ message: "总可选人数必须是整数" })
    @Min(1)
    @Max(999999)
    @Type(() => Number)
    total: number

    @IsInt({ message: "剩余可选人数必须是整数" })
    @Min(0)
    @Max(9999)
    @Type(() => Number)
    surplus: number

    @IsIn(crsStatus)
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}

