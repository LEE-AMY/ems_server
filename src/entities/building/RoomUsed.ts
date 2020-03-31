import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { status } from "../../types";

export class RoomUsed extends BaseEntity {

    @Length(2, 50)
    @Type(() => String)
    useType: string

    @Type(() => String)
    useCrsID: string

    @IsIn([-1, 1, 2, 3, 4, 5, 6, 7])
    @Type(() => Number)
    useWeek: number = -1

    fromDate: number | string

    toDate: number | string

    @Type(() => String)
    timeID: string

    @IsNotEmpty({ message: "所属学期编号ID不能为空" })
    @Type(() => String)
    termID: string

    @IsNotEmpty({ message: "使用教室ID不能为空" })
    @Type(() => String)
    roomID: string

    @IsIn(status)
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}