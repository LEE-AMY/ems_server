import { BaseEntity } from "../BaseEntity";
import { Length, IsEmail, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class Department extends BaseEntity {

    @Length(1, 60)
    @Type(() => String)
    deptName: string

    @Length(5, 200)
    @Type(() => String)
    address: string

    @Length(3, 100)
    @Type(() => String)
    phone: string

    @IsEmail()
    email: string

    @IsNotEmpty({ message: "学院描述ID不能为空" })
    @Type(() => String)
    descID: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}