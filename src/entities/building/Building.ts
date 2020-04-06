import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn, IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { status } from "../../types";

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

    @Type(() => String)
    manager?: string

    @Type(() => String)
    connectInf?: string

    @Type(() => Number)
    buildDate: number = new Date().getTime()

    @IsInt({ message: "建筑层数必须为整数" })
    @Min(1)
    @Type(() => Number)
    floor: number

    @IsIn(status)
    @Type(() => Number)
    status: number = 0

    @IsNotEmpty({ message: "建筑物描述id不能为空" })
    @Type(() => String)
    descID: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}