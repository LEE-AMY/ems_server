import { BaseEntity } from "../BaseEntity";
import { Length } from "class-validator";
import { Type } from "class-transformer";

export class Profession  extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    proCode: string

    @Length(2, 100)
    @Type(() => String)
    proName: string

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