import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class Room extends BaseEntity {

    @Length(3, 10)
    @Type(() => String)
    roomNo: string

    @Length(2, 20)
    @Type(() => String)
    roomType: string

    @Min(-100)
    @Max(500)
    @Type(() => Number)
    roomFloor: number

    @Min(1)
    @Max(99999)
    @Type(() => Number)
    capacity: number

    @Length(5, 10)
    @Type(() => String)
    buildNo: string

    @IsIn([0, 1, 2, 3])
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}