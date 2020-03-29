import { AdminModel } from "../db"
import { Admin } from "../entities/user/Admin"
import { IAdmin } from "../db/AdminSchema";

export class AdminService {

    public static async add(admin: Admin): Promise<IAdmin | string[]> {
        admin = Admin.transform(admin);

        const errs = await admin.validateThis();
        if (errs.length > 0) {
            return errs
        }

        return await AdminModel.create(admin)
    }

    public static async findByAccount(adminNo: string) {
        return await AdminModel.find({ adminNo })
    }
}