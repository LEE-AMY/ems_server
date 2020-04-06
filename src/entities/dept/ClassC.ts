import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn, IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { status } from "../../types";

/**
 * 班级类
 */
export class ClassC extends BaseEntity {

    @IsInt({ message: "学生人数必须为整数" })
    @Max(100000)
    @Min(0)
    @Type(() => Number)
    stuCnt: number = 0

    @IsNotEmpty({ message: "专业ID不能为空" })
    proID: string

    @IsNotEmpty({ message: "教师ID不能为空" })
    @Type((v) => {
        console.log("===>", v)
        return String
    })
    tchNo: string

    @IsIn(status)
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}