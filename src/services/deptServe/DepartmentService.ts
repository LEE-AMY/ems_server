import { Department, SearchCondition } from "../../entities"
import { DepartmentModel, IDepartment, IDescription } from "../../db"
import { ISearchResult } from "../../types"
import { DescriptionService } from ".."
import { cloneObj } from "../../utils"

export class DepartmentService {
    public static async add(dept: Department) {
        dept = Department.transform(dept)
        const errs = await dept.validateThis()
        if (errs.length) { return errs }
        return await DepartmentModel.create(dept)
    }

    public static async findByIdAndDelete(_id: string) {
        return await DepartmentModel.findByIdAndDelete(_id)
    }

    public static async edit(_id: string, dept: Department) {
        const newDept = Department.transform(dept)
        const errs = await newDept.validateThis(true)
        if (errs.length) { return errs }
        return await DepartmentModel.findByIdAndUpdate(_id, dept)
    }

    public static async findById(_id: string) {
        return await DepartmentModel.findById(_id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<IDepartment>> {
        condition = SearchCondition.transform(condition)
        const errors = await condition.validateThis(true)
        if (errors.length) {
            return {
                count: 0,
                data: [],
                errors
            }
        }
        const { key, page, limit } = condition
        const departments = await DepartmentModel.find({
            deptName: { $regex: new RegExp(key) }
        }).skip((page - 1) * limit).limit(limit)

        const count = await DepartmentModel.find({
            deptName: { $regex: new RegExp(key) }
        }).countDocuments()

        return {
            count,
            data: departments,
            errors: []
        }
    }
}