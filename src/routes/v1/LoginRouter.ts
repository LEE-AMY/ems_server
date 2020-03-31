import Express from "express"
import { ResponseHelp } from "../ResponseHelp"
import { AdminService, LoginService } from "../../services"
import { LoginCondition } from "../../entities"

const router = Express.Router()


router.post("/:userType", async (req, res) => {
    try {
        const loginCondition: LoginCondition = {
            userType: req.params.userType,
            ...req.body
        }
        const result = await LoginService.login(loginCondition)
        if (result === true) {
            ResponseHelp.sendData(result, req, res)
        } else (
            ResponseHelp.sendError(result, req, res)
        )
    } catch (error) {
        ResponseHelp.sendError("账号格式有误", req, res)
    }
})



export default router