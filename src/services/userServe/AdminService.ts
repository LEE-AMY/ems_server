import { Admin, SearchCondition } from "../../entities"
import { getHash } from "../../utils"
import { AdminModel, IAdmin } from "../../db"
import { ISearchResult, pwdType } from "../../types";

export class AdminService {

    public static async add(admin: Admin) {
        admin = Admin.transform(admin);
        const errs = await admin.validateThis();
        if (errs.length > 0) {
            return errs
        }

        admin.pwd = await getHash(admin.pwd)
        return await AdminModel.create(admin)
    }

    public static async delete(adminNo: string) {
        return await AdminModel.findOneAndDelete({ adminNo })
    }

    public static async edit(adminNo: string, admin: Admin) {
        const newAdmin = Admin.transform(admin)
        const errs = await newAdmin.validateThis(true)
        if (errs.length > 0) { return errs }

        const { adminNo: _, ...updateAdmin } = admin

        if (updateAdmin.pwd) {
            updateAdmin.pwd = await getHash(updateAdmin.pwd)
        }

        await AdminModel.updateOne({ adminNo }, updateAdmin)
        return true
    }

    public static async findByAccount(adminNo: string) {
        return await AdminModel.findOne({ adminNo })
    }

    /**
     * 模糊查找
     * @param condition
     */
    public static async find(condition: SearchCondition): Promise<ISearchResult<IAdmin>> {
        condition = SearchCondition.transform(condition)
        const errors = await condition.validateThis(true)
        if (errors.length) {
            return { errors, count: 0, data: [] }
        }

        const { key, page, limit } = condition
        const admins = await AdminModel.find({ adminNo: { $regex: new RegExp(key) } })
            .skip((page - 1) * limit)
            .limit(limit)

        const count = await AdminModel.find({ adminNo: { $regex: new RegExp(key) } })
            .countDocuments()

        // 屏蔽密码
        admins.forEach(item => item.pwd = pwdType)

        return {
            errors: [],
            count,
            data: admins
        }
    }
}