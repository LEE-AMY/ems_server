import express from "express"
import { AdminService } from "../../../services"
import { ResponseHelp } from "../../ResponseHelp"
import { pwdType } from "../../../types"

const router = express.Router()

/**
 * 新增管理员
 */
router.post("/", async (req, res) => {
    try {
        const result = await AdminService.add(req.body)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, res)
        } else {
            result.pwd = pwdType
            ResponseHelp.sendData(result, res)
        }
    } catch (error) {
        ResponseHelp.sendError("管理员账号必须唯一", res)
    }
})

/**
 * 删除管理员
 */
router.delete("/:adminNo", async (req, res) => {
    try {
        const result = await AdminService.delete(req.params.adminNo)
        ResponseHelp.sendData("success", res)
    } catch (error) {
        ResponseHelp.sendError("账号错误", res)
    }
})

/**
 * 修改管理员信息
 */
router.put("/:adminNo", async (req, res) => {
    try {
        const { _id = "", adminNo = "", ...admin } = req.body
        const result = await AdminService.edit(req.params.adminNo, admin)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, res)
        } else {
            ResponseHelp.sendData(result, res)
        }
    } catch (error) {
        ResponseHelp.sendError("账号错误", res)
    }
})


/**
 * 账号查找
 */
router.get("/:adminNo", async (req, res) => {
    try {
        const result = await AdminService.findByAccount(req.params.adminNo)
        if (result) {
            result.pwd = pwdType
            ResponseHelp.sendData(result, res)
        } else {
            ResponseHelp.sendError("账号不存在", res)
        }
    } catch (error) {
        ResponseHelp.sendError("账号错误", res)
    }
})

/**
 * 模糊查找
 */
router.get("", async (req, res) => {
    const result = await AdminService.find(req.query)
    ResponseHelp.sendPageData(result, res)
})

export default router