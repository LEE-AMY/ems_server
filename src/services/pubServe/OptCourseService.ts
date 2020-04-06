import { OptCourse, SearchCondition } from "../../entities"
import { OptCourseModel, IOptCourse } from "../../db"
import { ISearchResult } from "../../types"

export class OptCourseService {
    public static async add(opt: OptCourse) {
        opt = OptCourse.transform(opt)
        const errs = await opt.validateThis()
        if (errs.length) { return errs }
        return await OptCourseModel.create(opt)
    }

    public static async findByIdAndDelete(id: string) {
        return await OptCourseModel.findByIdAndDelete(id)
    }

    public static async edit(id: string, opt: OptCourse) {
        const newOpt = OptCourse.transform(opt)
        const errs = await newOpt.validateThis(true)
        if (errs.length) { return errs }
        return await OptCourseModel.findByIdAndUpdate(id, opt)
    }

    public static async findById(id: string) {
        return await OptCourseModel.findById(id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<IOptCourse>> {
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
                con.crsID = key
            } else {
                con.stuID = key
            }
        }

        const opt = await OptCourseModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await OptCourseModel.find(con)
            .countDocuments()

        return {
            errors,
            data: opt,
            count
        }
    }
}