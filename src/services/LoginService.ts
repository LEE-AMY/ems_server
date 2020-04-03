import { LoginCondition } from "../entities/LoginCondition";
import { EDBName, EStatus, pwdType } from "../types";
import { AdminService } from ".";
import { hashCompare } from "../utils"

export class LoginService {

    private static saltRounds = 10

    public static async login(loginCondition: LoginCondition) {
        loginCondition = LoginCondition.transform(loginCondition);

        const errs = await loginCondition.validateThis();

        if (errs.length > 0) {
            return errs
        }

        const result = await AdminService.findByAccount(loginCondition.userName)

        if(result && await hashCompare(loginCondition.userPwd, result.pwd)) {
            result.pwd = pwdType
        }else {
            return ["账号或密码错误"]
        }

        return result

        // let result: any = null
        // switch (loginCondition.userType) {
        //     case EDBName.Admin:
        //         result = await AdminService.loginValidate(loginCondition.userName, loginCondition.userPwd)
        //         break;
        //     default:
        //         return ["用户角色类型错误"]
        // }

        // if (result) {
        //     switch (result.status) {
        //         case EStatus.unActive:
        //             return ["账号未激活"]
        //         case EStatus.active:
        //             return true
        //         case EStatus.locked:
        //             return ["账号异常，已被锁定"]
        //         case EStatus.logout:
        //             return ["账号已被注销"]
        //         default:
        //             return ["账号异常"]
        //     }
        // }
        // return ["账号或密码错误"]
    }
}
