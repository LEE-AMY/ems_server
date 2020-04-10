import { BaseEntity } from "./BaseEntity";
import { Type } from "class-transformer";
import { Length, IsIn } from "class-validator";
import { EDBName } from "../types";

const typesArr = [EDBName.Admin, EDBName.Stu, EDBName.Tch]
export class LoginCondition extends BaseEntity {

    @IsIn(typesArr, { message: `登陆类型只能是${typesArr.join(",")}` })
    @Type(() => String)
    userType: string = EDBName.Stu

    @Length(2, 60, { message: "账号长度在2~60之间" })
    @Type(() => String)
    username: string

    @Length(6, 60, { message: "密码长度在6~60之间" })
    @Type(() => String)
    password: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}