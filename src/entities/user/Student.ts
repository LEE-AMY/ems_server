import { Type } from "class-transformer"
import { Length, IsIn, IsNotEmpty } from "class-validator"
import { BaseEntity } from "../BaseEntity"
import { status } from "../../types"

export class Student extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    stuNo: string

    @Length(6, 50)
    @Type(() => String)
    pwd: string

    @IsNotEmpty({ message: "所属班级不能为空" })
    clsID: string

    @IsNotEmpty({ message: "所属学院不能为空" })
    deptID: string

    loginTime: number = new Date().getTime()

    @IsIn(status)
    @Type(() => Number)
    status: number = 0

    infID?: string

    _index: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }

}