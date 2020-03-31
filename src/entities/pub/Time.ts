import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

/**
 * 时间安排计划类
 */
export class Time extends BaseEntity {

    @Length(1, 20)
    @Type(() => String)
    timeName: string

    @Length(8, 20)
    @Type(() => String)
    timeStart: string

    @Length(8, 20)
    @Type(() => String)
    timeEnd: string

    @IsNotEmpty({ message: "学期_id不能为空" })
    termID: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}