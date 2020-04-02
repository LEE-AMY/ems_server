import { Type } from "class-transformer"
import { Length, IsIn, IsNotEmpty } from "class-validator"
import { BaseEntity } from "../BaseEntity"
import { status } from "../../types"

export class Teacher extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    tchNo: string = "00000000"

    @Length(6, 50)
    @Type(() => String)
    pwd: string

    @IsNotEmpty({ message: "所属学院不能为空" })
    deptID: string

    loginTime: number = new Date().getTime()

    @IsIn(status)
    @Type(() => Number)
    status: number = 0

    infID?: string

    _index: number

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }

}
