import { Type } from "class-transformer"
import { Length } from "class-validator"
import { BaseEntity } from "../BaseEntity"

export class Teacher extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    tchNo: string

    @Length(1, 10)
    @Type(() => String)
    infNo: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}
