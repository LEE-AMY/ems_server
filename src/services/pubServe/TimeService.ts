import { Time, SearchCondition } from "../../entities"
import { TimeModel, ITime } from "../../db"
import { ISearchResult } from "../../types"


export class TimeService {
    public static async add(time: Time) {
        time = Time.transform(time)
        const errs = await time.validateThis()
        if (errs.length) { return errs }
        return await TimeModel.create(time)
    }

    public static async findByIdAndDelete(id: string) {
        return await TimeModel.findByIdAndDelete(id)
    }

    public static async edit(id: string, time: Time) {
        const newTime = Time.transform(time)
        const errs = await newTime.validateThis(true)
        if (errs.length) { return errs }
        return await TimeModel.findByIdAndUpdate(id, time)
    }

    public static async findById(id: string) {
        return await TimeModel.findById(id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<ITime>> {
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
                con.timeName = { $regex: new RegExp(key) }
            } else {
                con.termID = key
            }
        }

        const time = await TimeModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await TimeModel.find(con)
            .countDocuments()

        return {
            errors,
            data: time,
            count
        }
    }
}