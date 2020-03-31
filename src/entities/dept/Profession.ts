import { BaseEntity } from "../BaseEntity";
import { Length, IsIn, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { status } from "../../types";

/**
 * 专业类
 */
export class Profession extends BaseEntity {

    @Length(2, 100)
    @Type(() => String)
    proName: string

    @IsNotEmpty({ message: "专业所属学院ID不能为空" })
    @Type(() => String)
    deptID: string

    @IsNotEmpty({ message: "专业描述ID不能为空" })
    @Type(() => String)
    descID: string

    @IsIn(status)
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}