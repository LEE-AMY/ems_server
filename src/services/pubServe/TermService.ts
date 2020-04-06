import { Term, SearchCondition } from "../../entities"
import { TermModel, ITerm } from "../../db"
import { ISearchResult } from "../../types"


export class TermService {
    public static async add(term: Term) {
        term = Term.transform(term)
        const errs = await term.validateThis()
        if (errs.length) { return errs }
        return await TermModel.create(term)
    }

    public static async findByIdAndDelete(id: string) {
        return await TermModel.findByIdAndDelete(id)
    }

    public static async edit(id: string, term: Term) {
        const newTerm = Term.transform(term)
        const errs = await newTerm.validateThis(true)
        if (errs.length) { return errs }
        return await TermModel.findByIdAndUpdate(id, term)
    }

    public static async findById(id: string) {
        return await TermModel.findById(id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<ITerm>> {
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
                con.termName = { $regex: new RegExp(key) }
            } else {
                con.fromDate = { $regex: new RegExp(key) }
            }
        }

        const term = await TermModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await TermModel.find(con)
            .countDocuments()

        return {
            errors,
            data: term,
            count
        }
    }
}