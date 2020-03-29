import { BaseEntity } from "../BaseEntity";
import { Length, IsIn } from "class-validator";
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

    @IsIn([0, 1, 2, 3])
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}