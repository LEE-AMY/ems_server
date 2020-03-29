import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class Building extends BaseEntity {

    @Length(1, 4)
    @Type(() => String)
    buildNo: string

    @Length(2, 20)
    @Type(() => String)
    buildName: string

    @Length(2, 200)
    @Type(() => String)
    buildAddress: string

    @Length(2, 200)
    @Type(() => String)
    manager: string

    @Length(2, 200)
    @Type(() => String)
    connectInf: string

    @Type(() => Number)
    buildDate: number

    @Min(1)
    @Max(500)
    @Type(() => Number)
    floor: number

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