import { Type } from "class-transformer"
import { Length, IsIn } from "class-validator"
import { BaseEntity } from "../BaseEntity"

export class Student extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    stuNo: string

    @Length(6, 50)
    @Type(() => String)
    pwd: string

    @Length(1, 10)
    @Type(() => String)
    infNo: string

    @Length(5, 10)
    @Type(() => String)
    clsNo: string

    loginTime: number = new Date().getTime()

    @IsIn([0, 1, 2, 3])
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }

}