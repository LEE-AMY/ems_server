import { UserInf } from "../../entities"
import { UserBaseModel } from "../../db"

export class UserBaseService {
    public static async add(ubs: UserInf) {
        ubs = UserInf.transform(ubs)
        const errs = await ubs.validateThis()
        if (errs.length) { return errs }
        return await UserBaseModel.create(ubs)
    }

    public static async findByIdAndDelete(id: string) {
        return await UserBaseModel.findByIdAndDelete(id)
    }

    public static async edit(id: string, ubs: UserInf) {
        const newUbs = UserInf.transform(ubs)
        const errs = await newUbs.validateThis(true)
        if (errs.length) { return errs }
        return await UserBaseModel.findByIdAndUpdate(id, ubs)
    }

    public static async findById(id: string) {
        return await UserBaseModel.findById(id)
    }
}