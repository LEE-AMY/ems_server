import { BaseEntity } from "../BaseEntity";
import { Length, Min, Max, IsIn, IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { status } from "../../types";

export class Room extends BaseEntity {

    @Length(3, 10)
    @Type(() => String)
    roomNo: string

    @Length(2, 20)
    @Type(() => String)
    roomType: string

    @IsInt({ message: "教室所属楼层必须为整数" })
    @Min(-100)
    @Type(() => Number)
    roomFloor: number

    @IsInt({ message: "容纳人数必须为整数" })
    @Min(1)
    @Type(() => Number)
    capacity: number

    @IsNotEmpty({ message: "教室所属建筑ID不能为空" })
    @Type(() => String)
    buildID: string

    @IsIn(status)
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}