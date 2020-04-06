import Express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { LoginService } from "../../../services"
import { LoginCondition } from "../../../entities"

const router = Express.Router()


router.post("/:userType", async (req, res) => {
    try {
        const loginCondition: LoginCondition = {
            userType: req.params.userType,
            ...req.body
        }
        const result = await LoginService.login(loginCondition)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, req, res)
        } else (
            ResponseHelp.sendData(result, req, res)
        )
    } catch (error) {
        ResponseHelp.sendError("账号格式有误", req, res)
    }
})

export default router