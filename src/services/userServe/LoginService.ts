import { LoginCondition } from "../../entities"
import { EDBName, EStatus, pwdType } from "../../types"
import { AdminService, StudentService, TeacherService } from ".."
import { hashCompare } from "../../utils"
import { IAdmin, IStudent, ITeacher } from "../../db"

export class LoginService {

    public static async login(loginCondition: LoginCondition) {
        loginCondition = LoginCondition.transform(loginCondition);
        const errs = await loginCondition.validateThis();
        if (errs.length > 0) {
            return errs
        }

        const { userType, userName, userPwd } = loginCondition

        let result: IAdmin | IStudent | ITeacher | null
        switch (userType) {
            case EDBName.Admin:
                result = await AdminService.loginFind(userName)
                break;
            case EDBName.Stu:
                result = await StudentService.loginFind(userName)
                break;
            case EDBName.Tch:
                result = await TeacherService.loginFind(userName)
                break;
            default:
                return ["用户角色类型错误"]
        }

        if (result) {

            if(!await hashCompare(userPwd, result.pwd)) {
                return ["账号或密码错误 "]
            }

            result.pwd = pwdType

            switch (result.status) {
                case EStatus.unActive:
                    return ["账号未激活"]
                case EStatus.active:
                    return result
                case EStatus.logout:
                    return ["账号已被注销"]
                case EStatus.locked:
                    return ["账号已被锁"]
                default:
                    return ["账号状态异常"]
            }
        } else {
            return ["账号或密码错误"]
        }

    }
}
