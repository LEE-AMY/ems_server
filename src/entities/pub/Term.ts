import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class Term extends BaseEntity {

    @Length(1, 10)
    @Type(() => String)
    termNo: string

    @Length(1, 20)
    termName: string

    @Type(() => Number)
    fromDate: number = new Date().getTime()

    @Type(() => Number)
    toDate: number = new Date().getTime()

    @IsIn([0, 1, 2, 3])
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}