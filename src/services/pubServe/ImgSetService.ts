import { ImgSet, SearchCondition } from "../../entities";
import { ImgSetModel, IImgSet } from "../../db";
import { ISearchResult } from "../../types";

export class ImgSetService {
    public static async add(img: ImgSet) {
        img = ImgSet.transform(img)
        const errs = await img.validateThis()
        if (errs.length) {
            return errs
        }

        return await ImgSetModel.create(img)
    }

    public static async edit(id: string, img: ImgSet) {
        img = ImgSet.transform(img)
        const errs = await img.validateThis(true)
        if (errs.length) {
            return errs
        }

        return await ImgSetModel.findByIdAndUpdate(id, img)
    }

    public static async findByIdAndDelete(id: string) {
        return await ImgSetModel.findByIdAndDelete(id)
    }

    public static async findById(id: string) {
        return await ImgSetModel.findById(id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<IImgSet>> {
        condition = SearchCondition.transform(condition)
        const errors = await condition.validateThis(true)
        if (errors.length) {
            return {
                count: 0,
                data: [],
                errors
            }
        }
        const { key, page, limit, keyType } = condition
        const con: any = {}
        if (key) {
            if (!keyType) {
                con.useID = key
            } else if (keyType === "type") {
                con.type = { $regex: new RegExp(key) }
            }
            else {
                con.setName = { $regex: new RegExp(key) }
            }
        }

        const imgSet = await ImgSetModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await ImgSetModel.find(con)
            .countDocuments()

        return {
            errors,
            data: imgSet,
            count
        }
    }



}