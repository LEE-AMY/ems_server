import Express from "express"
import { ResponseHelp } from "../ResponseHelp"
import { AdminService } from "../../services"
import { EDBName } from "../../types"

const router = Express.Router()


router.post("", async (req, res) => {
    try {
        const result = await loginHelp(req.body)
        if (result) {
            ResponseHelp.sendData(result, req, res)
        } else (
            ResponseHelp.sendError("账号或密码错误", req, res)
        )
    } catch (error) {
        ResponseHelp.sendError("账号格式有误", req, res)
    }
})

async function loginHelp({ userType, userName, userPwd }) {
    let result: any = ""
    switch (userType) {
        case EDBName.Admin:
            result = await AdminService.loginValidate(userName, userPwd)
            break;
        case EDBName.Stu:
            break;
        case EDBName.Tch:
            break;
        default:
            break;
    }

    if (result) {
        return {
            userName,
            name: result.name
        }
    }

    return result
}


export default router