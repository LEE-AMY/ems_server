import { BaseEntity } from "../BaseEntity";
import { Type } from "class-transformer";
import { IsNotEmpty, IsIn, IsArray, ValidateNested } from "class-validator";
import { status } from "../../types";
import { ImgPath } from "./ImgPath";


export class ImgTab extends BaseEntity {

    @IsNotEmpty({ message: "使用id不能为空" })
    @Type(() => String)
    useID: string

    @ValidateNested({ each: true })
    @IsArray({ message: "头像必须是数组类型" })
    @Type(() => String)
    avatar: ImgPath[] = []

    @ValidateNested({ each: true })
    @IsArray({ message: "图片必须是数组类型" })
    @Type(() => String)
    img: ImgPath[] = []

    @IsIn(status)
    @Type(() => Number)
    status: number = 0

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}