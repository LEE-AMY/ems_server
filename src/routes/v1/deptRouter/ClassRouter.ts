import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { ClassService } from "../../../services"

const router = express.Router()

router.post("", async (req, res) => {
    try {
        const result = await ClassService.add(req.body)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, res)
            return
        }
        ResponseHelp.sendData(result, res)
    } catch (error) {
        ResponseHelp.sendError("专业或教师id类型错误", res)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const result = await ClassService.findByIdAndDelete(req.params.id)
        if (!result) {
            ResponseHelp.sendError("班级id错误", res)
            return
        }
        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError("班级id错误", res)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { _id, ...body } = req.body
        const result = await ClassService.edit(req.params.id, body)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, res)
            return
        }
        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError("班级id错误", res)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const result = await ClassService.findById(req.params.id)
        if (!result) {
            ResponseHelp.sendError("班级id错误", res)
            return
        }
        ResponseHelp.sendData(result, res)
    } catch (error) {
        ResponseHelp.sendError("班级id错误", res)
    }
})

router.get("", async (req, res) => {
    try {
        const result = await ClassService.find(req.query)
        ResponseHelp.sendPageData(result, res)
    } catch (error) {
        ResponseHelp.sendError("查询条件异常", res)
    }
})

export default router