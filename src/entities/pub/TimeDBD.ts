import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class TimeDBD extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    dbdNo: string

    @Length(0, 20)
    @Type(() => String)
    morning: string

    @Length(0, 20)
    @Type(() => String)
    night: string

    @Length(0, 20)
    @Type(() => String)
    lesson1: string

    @Length(0, 20)
    @Type(() => String)
    lesson2: string

    @Length(0, 20)
    @Type(() => String)
    lesson3: string

    @Length(0, 20)
    @Type(() => String)
    lesson4: string

    @Length(0, 20)
    @Type(() => String)
    lesson5: string

    @Length(0, 20)
    @Type(() => String)
    lesson6: string

    @Length(0, 20)
    @Type(() => String)
    lesson7: string

    @Length(0, 20)
    @Type(() => String)
    lesson8: string

    @Length(0, 20)
    @Type(() => String)
    lesson9: string

    @Length(0, 20)
    @Type(() => String)
    lesson10: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}