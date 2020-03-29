import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class ClassC extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    clsNo: string

    @Max(100000)
    @Min(0)
    @Type(() => Number)
    stuCnt: number = 0

    @Length(5, 10)
    @Type(() => String)
    proCode: string


    @Length(5, 10)
    @Type(() => String)
    tchNo: string

    @IsIn([0, 1, 2, 3])
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}