import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class RoomUsed extends BaseEntity {

    @Length(1, 10)
    @Type(() => String)
    useNo: string

    @Length(2, 50)
    @Type(() => String)
    useType: string

    @Type(() => String)
    useCrs: string

    @IsIn([-1, 1, 2, 3, 4, 5, 6, 7])
    @Type(() => Number)
    useWeek: number = -1

    fromDate: number | string

    toDate: number | string

    @Type(() => String)
    timeNo: string

    @Length(1, 10)
    @Type(() => String)
    termNo: string

    @Length(3, 10)
    @Type(() => String)
    roomNo: string

    @IsIn([0, 1, 2, 3])
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}