import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

/**
 * 课程名称类
 */
export class Course extends BaseEntity {

    @Length(2, 100)
    @Type(() => String)
    crsName: string

    @Min(0)
    @Max(10)
    @Type(() => Number)
    crsScore: number

    @Length(2, 10)
    @Type(() => String)
    crsType: string

    @Min(0)
    @Max(100)
    @Type(() => Number)
    crsTime: number

    @Type(() => String)
    crsPre?: string

    @IsNotEmpty({ message: "课程描述ID不能为空" })
    @Type(() => String)
    descID: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}