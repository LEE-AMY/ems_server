import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { CourseTabService } from "../../../services"

const router = express.Router()

router.post("", async (req, res) => {
    try {
        const result = await CourseTabService.add(req.body)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, res)
            return
        }
        ResponseHelp.sendData(result, res)
    } catch (error) {
        ResponseHelp.sendError(error, res)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await CourseTabService.findByIdAndDelete(id)
        if (!result) {
            ResponseHelp.sendError(`id[${id}]不存在`, res)
            return
        }
        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError(error, res)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await CourseTabService.findById(id)
        if (!result) {
            ResponseHelp.sendError(`id[${id}]不存在`, res)
            return
        }
        ResponseHelp.sendData(result, res)
    } catch (error) {
        ResponseHelp.sendError(error, res)
    }
})

router.get("", async (req, res) => {
    const result = await CourseTabService.find(req.query)
    ResponseHelp.sendPageData(result, res)
})

router.put("/:id", async (req, res) => {
    try {
        const { _id, ...descBody } = req.body
        const desc = await CourseTabService.edit(req.params.id, descBody)
        if (Array.isArray(desc) || desc === null) {
            ResponseHelp.sendError(desc ? desc : "教室id错误" + req.params.id, res)
            return
        }
        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError("教室id错误" + error, res)
    }
})

export default router