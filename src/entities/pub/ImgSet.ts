import { BaseEntity } from "../BaseEntity";
import { Type } from "class-transformer";
import { IsNotEmpty, IsIn } from "class-validator";
import { status, imgTypeArr } from "../../types";

export class ImgSet extends BaseEntity {

    @IsNotEmpty({ message: "使用id不能为空" })
    @Type(() => String)
    useID: string

    @IsIn(imgTypeArr, { message: `图片类型只能是${imgTypeArr}` })
    @IsNotEmpty({ message: "图片类型不能为空" })
    @Type(() => String)
    type: string

    @IsNotEmpty({ message: "图片路径不能为空" })
    @Type(() => String)
    url: string

    @Type(() => String)
    setName: string = "other"

    upTime: number = Date.now()

    @IsIn(status)
    @Type(() => Number)
    status: number = 1

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}