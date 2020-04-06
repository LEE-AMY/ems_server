import { Course, SearchCondition } from "../../entities"
import { CourseModel, ICourse } from "../../db"
import { ISearchResult } from "../../types"

export class CourseService {
    public static async add(crs: Course) {
        crs = Course.transform(crs)
        const errs = await crs.validateThis()
        if (errs.length) { return errs }

        return await CourseModel.create(crs)
    }

    public static async findByIdAndDelete(id: string) {
        return await CourseModel.findByIdAndDelete(id)
    }

    public static async delete(_id: string) {
        await CourseModel.deleteOne({ _id })
        return true
    }

    public static async edit(id: string, crs: Course) {
        const newCrs = Course.transform(crs)
        const errs = await newCrs.validateThis(true)
        if (errs.length) { return errs }
        return await CourseModel.findByIdAndUpdate(id, crs)
    }

    public static async findById(_id: string) {
        return await CourseModel.findById(_id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<ICourse>> {
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
                con.crsName = { $regex: new RegExp(key) }
            } else {
                con.crsType = { $regex: new RegExp(key) }
            }
        }

        const courses = await CourseModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await CourseModel.find(con)
            .countDocuments()

        return {
            errors,
            data: courses,
            count
        }
    }
}