import { EDBName } from "../types"
import { AdminModel } from "../db"

export class LoginService {
    public static async findByAccount(account: string, type: string) {
        switch (type) {
            case EDBName.Admin:
                break;

            default:
                break;
        }
    }
}