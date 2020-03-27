import { BaseEntity } from "../BaseEntity";
import { Length } from "class-validator";
import { Type } from "class-transformer";

export class Department extends BaseEntity {

    @Length(1, 4)
    @Type(() => String)
    deptCode: string

    @Length(1, 60)
    @Type(() => String)
    deptName: string

    @Length(5, 200)
    @Type(() => String)
    address: string

    @Length(3, 100)
    @Type(() => String)
    cellNo: string

    @Length(1, 100)
    @Type(() => String)
    descCode: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}