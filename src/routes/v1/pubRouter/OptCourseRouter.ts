import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { OptCourseService } from "../../../services"

const router = express.Router()

router.post("", async (req, res) => {
    try {
        const result = await OptCourseService.add(req.body)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, req, res)
            return
        }
        ResponseHelp.sendData(result, req, res)
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await OptCourseService.findByIdAndDelete(id)
        if (!result) {
            ResponseHelp.sendError(`id[${id}]不存在`, req, res)
            return
        }
        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await OptCourseService.findById(id)
        if (!result) {
            ResponseHelp.sendError(`id[${id}]不存在`, req, res)
            return
        }
        ResponseHelp.sendData(result, req, res)
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

router.get("", async (req, res) => {
    const result = await OptCourseService.find(req.query)
    ResponseHelp.sendPageData(result, req, res)
})

router.put("/:id", async (req, res) => {
    try {
        const { _id,  ...optBody } = req.body
        const desc = await OptCourseService.edit(req.params.id, optBody)
        if (Array.isArray(desc) || desc === null) {
            ResponseHelp.sendError(desc ? desc : "选课id错误" + req.params.id, req, res)
            return
        }
        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError("选课id错误" + error, req, res)
    }
})

export default router