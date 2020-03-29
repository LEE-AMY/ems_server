import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class Course extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    crsCode: string

    @Length(2, 100)
    @Type(() => String)
    crsName: string

    @Min(0)
    @Max(10)
    @Type(() => Number)
    crsScore: number

    @Length(2, 10)
    @Type(() => String)
    crsType: string

    @Min(0)
    @Max(100)
    @Type(() => Number)
    crsTime: number

    @Type(() => String)
    crsPre: string

    @Length(5, 10)
    @Type(() => String)
    descCode: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}