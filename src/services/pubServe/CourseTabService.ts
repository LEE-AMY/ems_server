import { CourseTab, SearchCondition } from "../../entities"
import { CourseTabModel, ICourseTab } from "../../db"
import { ISearchResult } from "../../types"

export class CourseTabService {
    public static async add(crsTab: CourseTab) {
        crsTab = CourseTab.transform(crsTab)
        const errs = await crsTab.validateThis()
        if (errs.length) { return errs }
        return await CourseTabModel.create(crsTab)
    }

    public static async findByIdAndDelete(id: string) {
        return await CourseTabModel.findByIdAndDelete(id)
    }

    public static async edit(id: string, crsTab: CourseTab) {
        const newCrsTab = CourseTab.transform(crsTab)
        const errs = await newCrsTab.validateThis(true)
        if (errs.length) { return errs }
        return await CourseTabModel.findByIdAndUpdate(id, crsTab)
    }

    public static async findById(id: string) {
        return await CourseTabModel.findById(id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<ICourseTab>> {
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
                con.tchID = key
            } else {
                con.crsID = key
            }
        }

        const desc = await CourseTabModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await CourseTabModel.find(con)
            .countDocuments()

        return {
            errors,
            data: desc,
            count
        }
    }
}