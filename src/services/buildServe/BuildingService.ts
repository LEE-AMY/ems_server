import { Building, SearchCondition } from "../../entities"
import { BuildingModel, IBuilding } from "../../db"
import { ISearchResult } from "../../types"

export class BuildingService {
    public static async add(build: Building) {
        build = Building.transform(build)
        const errs = await build.validateThis()
        if (errs.length) { return errs }
        return await BuildingModel.create(build)
    }

    public static async findByIdAndDelete(id: string) {
        return await BuildingModel.findByIdAndDelete(id)
    }

    public static async edit(id: string, build: Building) {
        const newBuild = Building.transform(build)
        const errs = await newBuild.validateThis(true)
        if (errs.length) { return errs }
        return await BuildingModel.findByIdAndUpdate(id, build)
    }

    public static async findById(id: string) {
        return await BuildingModel.findById(id)
    }

    public static async find(condition: SearchCondition):Promise<ISearchResult<IBuilding>> {
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
                con.buildName = { $regex: new RegExp(key) }
            } else {
                con.buildAddress = { $regex: new RegExp(key) }
            }
        }

        const building = await BuildingModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await BuildingModel.find(con)
            .countDocuments()

        return {
            errors,
            data: building,
            count
        }
    }
}