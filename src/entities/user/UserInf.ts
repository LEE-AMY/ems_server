import { Type } from "class-transformer"
import { Length, IsIn } from "class-validator"
import { BaseEntity } from "../BaseEntity"

export class UserInf extends BaseEntity {

    @Length(1, 10)
    @Type(() => String)
    infNo: string

    @Length(6, 50)
    @Type(() => String)
    pwd: string

    @Length(2, 60)
    name: string

    @IsIn([1, 2])
    @Type(() => Number)
    sex: number

    @Length(5, 20)
    @Type(() => String)
    idNo: string

    @Type(() => Number)
    joinDate: number

    @Length(5, 200)
    @Type(() => String)
    address: string

    @Length(5, 10)
    @Type(() => String)
    descCode: string

    @Length(1, 4)
    @Type(() => String)
    deptCode: string

    @IsIn([0, 1, 2, 3])
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}