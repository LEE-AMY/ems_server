import { Description, SearchCondition } from "../../entities"
import { DescriptionModel, IDescription } from "../../db"
import { ISearchResult } from "../../types"

export class DescriptionService {
    public static async add(desc: Description) {
        desc = Description.transform(desc)
        const errs = await desc.validateThis()
        if (errs.length) { return errs }
        return await DescriptionModel.create(desc)
    }

    public static async findByIdAndDelete(id: string) {
        return await DescriptionModel.findByIdAndDelete(id)
    }

    public static async delete(id: string) {
        await DescriptionModel.deleteOne({ _id: id })
        return true
    }

    public static async edit(id: string, desc: Description) {
        const newDesc = Description.transform(desc)
        const errs = await newDesc.validateThis(true)
        if (errs.length) { return errs }

        return await DescriptionModel.findByIdAndUpdate(id, desc)
    }

    public static async findById(id: string) {
        return await DescriptionModel.findById(id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<IDescription>> {
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
                con.descTitle = { $regex: new RegExp(key) }
            } else {
                con.descDetail = { $regex: new RegExp(key) }
            }
        }

        const desc = await DescriptionModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await DescriptionModel.find(con)
            .countDocuments()

        return {
            errors,
            data: desc,
            count
        }
    }
}