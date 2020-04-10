import Express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { LoginService } from "../../../services"
import { LoginCondition } from "../../../entities"
import { getToken } from "../../../utils"

const router = Express.Router()


router.post("/:userType", async (req, res) => {
    try {
        const loginCondition: LoginCondition = {
            userType: req.params.userType,
            ...req.body
        }
        const result = await LoginService.login(loginCondition)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, res)
            return
        }

        const token = getToken(result._id, loginCondition.username)
        // const token = "1234567890-"
        const login: any = {
            token,
            id: result._id
        }
        ResponseHelp.sendData(login, res)
    } catch (error) {
        ResponseHelp.sendError("账号格式有误" + error, res)
    }
})

export default router
