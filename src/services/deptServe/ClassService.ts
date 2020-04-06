import { ClassC, SearchCondition } from "../../entities"
import { ClassModel, IClass } from "../../db"
import { ISearchResult } from "../../types"

export class ClassService {
    public static async add(cls: ClassC) {
        cls = ClassC.transform(cls)
        const errs = await cls.validateThis()
        if (errs.length) { return errs }
        return await ClassModel.create(cls)
    }

    public static async findByIdAndDelete(id: string) {
        return await ClassModel.findByIdAndDelete(id)
    }

    public static async edit(_id: string, cls: ClassC) {
        const newCls = ClassC.transform(cls)
        const errs = await newCls.validateThis(true)
        if (errs.length) { return errs }
        await ClassModel.updateOne({ _id }, cls)
        return true
    }

    public static async findById(_id: string) {
        return await ClassModel.findById(_id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<IClass>> {
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
                con.proID = key
            } else {
                con.tchNo = key
            }
        }

        const pros = await ClassModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await ClassModel.find(con)
            .countDocuments()

        return {
            errors,
            data: pros,
            count
        }
    }
}