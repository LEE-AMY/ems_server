import { Type } from "class-transformer"
import { Length, IsIn, IsEmail, IsPhoneNumber } from "class-validator"
import { BaseEntity } from "../BaseEntity"
import { EGender } from "../../types"

export class UserInf extends BaseEntity {

    @Length(2, 60)
    name: string

    @IsIn([EGender.male, EGender.female])
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

    @IsEmail()
    email: string

    descID: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}