import { Type } from "class-transformer"
import { Length, IsIn } from "class-validator"
import { BaseEntity } from "../BaseEntity"

export class UserInf extends BaseEntity {

    @Length(1, 10)
    @Type(() => String)
    infNo: string

    @Length(2, 60)
    name: string

    @IsIn([1, 2])
    @Type(() => Number)
    sex: number = 0

    @Length(8, 8)
    @Type(() => String)
    birth: string

    @Length(5, 20)
    @Type(() => String)
    idNo: string

    @Type(() => Number)
    joinDate: number = new Date().getTime()

    @Length(5, 200)
    @Type(() => String)
    address: string

    phone: string

    email: string

    @Length(1, 4)
    @Type(() => String)
    deptCode: string

    @Length(5, 10)
    @Type(() => String)
    descCode: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}