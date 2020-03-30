import Express from "express"
import { ResponseHelp } from "../ResponseHelp"
import { AdminService } from "../../services"

const router = Express.Router()

/**
 * 账号是否存在
 */
router.get("/:adminNo", async (req, res) => {
    try {
        const result = await AdminService.findByAccount(req.params.adminNo)
        ResponseHelp.sendData(result.length > 0, req, res)
    } catch (error) {
        ResponseHelp.sendError("adminNo格式有误", req, res)
    }
})

/**
 * 添加管理员
 */
router.post("", async (req, res) => {

    const result = await AdminService.add(req.body)
    if (Array.isArray(result)) {
        ResponseHelp.sendError(result, req, res)
    } else {
        ResponseHelp.sendData(result, req, res)
    }

})

/**
 * 管理员登陆
 */
router.post("/:adminNo", async (req, res) => {
    try {
        const result = await AdminService.findByAccount(req.params.adminNo)
        const lgRes = result[0] && result[0].pwd === req.body!.pwd
        console.log(req.cookies)
        if (lgRes) {
            res.cookie("token", `${req.params.adminNo}|${result[0].pwd}`, { maxAge: 60000000 })
            ResponseHelp.sendData(lgRes, req, res)
        } else {

            ResponseHelp.sendError("账号或密码有误", req, res)
        }
    } catch (error) {
        ResponseHelp.sendError("账号格式有误", req, res)
    }
})

/**
 * 删除管理员
 */
router.delete("/:adminNo", async (req, res) => {
    try {
        const result = await AdminService.delete(req.params.adminNo)
        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError("adminNo格式有误", req, res)
    }
})

/**
 * 修改管理员账号
 */
router.put("/:adminNo", async (req, res) => {
    try {
        const result = await AdminService.edit(req.params.adminNo, req.body)

        if (result.length > 0) {
            ResponseHelp.sendError(result, req, res)
        } else {
            ResponseHelp.sendData(result, req, res)
        }
    } catch (error) {
        ResponseHelp.sendData("adminNo格式有误", req, res)
    }
})

export default router