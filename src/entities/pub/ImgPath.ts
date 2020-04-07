import { BaseEntity } from "../BaseEntity";
import { Type } from "class-transformer";
import { IsNotEmpty, IsIn, IsArray } from "class-validator";
import { status } from "../../types";


export class ImgPath extends BaseEntity {

    @IsNotEmpty({ message: "路径不能为空" })
    @Type(() => String)
    path: string

    @IsIn(status)
    @Type(() => Number)
    status: number = 0

    @Type(() => Number)
    upDate: number = Date.now()

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}