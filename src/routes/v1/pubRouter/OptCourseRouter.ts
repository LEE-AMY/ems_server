import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { OptCourseService } from "../../../services"

const router = express.Router()

router.post("", async (req, res) => {
    try {
        const result = await OptCourseService.add(req.body)
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
        const result = await OptCourseService.findByIdAndDelete(id)
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
        const result = await OptCourseService.findById(id)
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
    const result = await OptCourseService.find(req.query)
    ResponseHelp.sendPageData(result, res)
})

router.put("/:id", async (req, res) => {
    try {
        const { _id, ...optBody } = req.body
        const desc = await OptCourseService.edit(req.params.id, optBody)
        if (Array.isArray(desc) || desc === null) {
            ResponseHelp.sendError(desc ? desc : "选课id错误" + req.params.id, res)
            return
        }
        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError("选课id错误" + error, res)
    }
})

export default router