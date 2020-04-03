import { AdminModel } from "../db"
import { Admin } from "../entities/user/Admin"
import { IAdmin } from "../db/AdminSchema";
import { pwdType, EDBName } from "../types";
import { getHash } from "../utils";

export class AdminService {

    private static saltRounds = 10

    public static async add(admin: Admin): Promise<IAdmin | string[]> {
        admin = Admin.transform(admin);

        const errs = await admin.validateThis();
        if (errs.length > 0) {
            return errs
        }

        // const acc = await this.findByAccount(admin.adminNo)
        // if (acc.length > 0) {
        //     return [`账号${admin.adminNo}已存在`]
        // }

        admin.pwd = await getHash(admin.pwd, this.saltRounds)

        return await AdminModel.create(admin)
    }

    public static async delete(adminNo: string) {
        await AdminModel.deleteOne({ adminNo })
        return true
    }

    public static async findByAccount(adminNo: string) {
        return await AdminModel.findOne({ adminNo })
    }

    public static async edit(adminNo: string, admin: Admin) {
        admin = Admin.transform(admin)

        const errs = await admin.validateThis(true)

        if (errs.length > 0) {
            return errs
        }

        return await AdminModel.updateOne({ adminNo }, admin)
    }

    public static async loginValidate(adminNo: string, pwd: string) {
        const result = await AdminModel.findOne({ adminNo, pwd })
        if (result) result.pwd = pwdType
        return result
    }
}