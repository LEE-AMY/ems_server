import { Profession, SearchCondition } from "../../entities"
import { ProfessionModel, IProfession } from "../../db"
import { ISearchResult } from "../../types"

export class ProfessionService {
    public static async add(pro: Profession) {
        pro = Profession.transform(pro)
        const errs = await pro.validateThis()
        if (errs.length) { return errs }
        return await ProfessionModel.create(pro)
    }

    public static async findByIdAndDelete(id: string) {
        return await ProfessionModel.findByIdAndDelete(id)
    }

    public static async edit(_id: string, pro: Profession) {
        const newPro = Profession.transform(pro)
        const errs = await newPro.validateThis(true)
        if (errs.length) { return errs }
        await ProfessionModel.updateOne({ _id }, pro)
    }

    public static async findById(_id: string) {
        return await ProfessionModel.findById(_id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<IProfession>> {
        condition = SearchCondition.transform(condition)
        const errors = await condition.validateThis(true)
        if (errors.length) {
            return {
                errors,
                data: [],
                count: 0
            }
        }

        // console.log(condition)

        const { key, page, limit } = condition
        const con: any = {}
        if (key) {
            con.deptID = key
        }
        const pros = await ProfessionModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await ProfessionModel.find(con)
            .countDocuments()

        return {
            errors,
            data: pros,
            count
        }

    }
}