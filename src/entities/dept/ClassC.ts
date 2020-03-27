import { BaseEntity } from "../BaseEntity";
import { Length } from "class-validator";
import { Type } from "class-transformer";

export class ClassC extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    clsNo: string

    @Length(5, 10)
    @Type(() => String)
    stuNo: string


    @Length(5, 10)
    @Type(() => String)
    masterNo: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}