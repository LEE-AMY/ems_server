import { BaseEntity } from "./BaseEntity"
import { Type } from "class-transformer"
import { Min, IsInt } from "class-validator"

export class SearchCondition extends BaseEntity {

    @IsInt({ message: "页码必须为整数" })
    @Min(1, { message: "页码最小值为1" })
    @Type(() => Number)
    page: number = 1

    @IsInt({ message: "页容量必须为整数" })
    @Min(1, { message: "页容量最小值为1" })
    @Type(() => Number)
    limit: number = 10

    @Type(() => String)
    key: string = ""

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}