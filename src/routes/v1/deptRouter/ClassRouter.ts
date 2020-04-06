import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { ClassService } from "../../../services"

const router = express.Router()

router.post("", async (req, res) => {
    try {
        const result = await ClassService.add(req.body)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, req, res)
            return
        }
        ResponseHelp.sendData(result, req, res)
    } catch (error) {
        ResponseHelp.sendError("专业或教师id类型错误", req, res)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const result = await ClassService.findByIdAndDelete(req.params.id)
        if (!result) {
            ResponseHelp.sendError("班级id错误", req, res)
            return
        }
        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError("班级id错误", req, res)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { _id, ...body } = req.body
        const result = await ClassService.edit(req.params.id, body)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, req, res)
            return
        }
        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError("班级id错误", req, res)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const result = await ClassService.findById(req.params.id)
        if (!result) {
            ResponseHelp.sendError("班级id错误", req, res)
            return
        }
        ResponseHelp.sendData(result, req, res)
    } catch (error) {
        ResponseHelp.sendError("班级id错误", req, res)
    }
})

router.get("", async (req, res) => {
    try {
        const result = await ClassService.find(req.query)
        ResponseHelp.sendPageData(result, req, res)
    } catch (error) {
        ResponseHelp.sendError("查询条件异常", req, res)
    }
})

export default router