import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { RoomUsedService } from "../../../services"

const router = express.Router()

router.post("", async (req, res) => {
    try {
        const result = await RoomUsedService.add(req.body)
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
        const result = await RoomUsedService.findByIdAndDelete(id)
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
        const result = await RoomUsedService.findById(id)
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
    const result = await RoomUsedService.find(req.query)
    ResponseHelp.sendPageData(result, res)
})

router.put("/:id", async (req, res) => {
    try {
        const { _id, ...roomUsedBody } = req.body
        const room = await RoomUsedService.edit(req.params.id, roomUsedBody)
        if (Array.isArray(room) || room === null) {
            ResponseHelp.sendError(room ? room : "使用教室id错误" + req.params.id, res)
            return
        }
        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError("使用教室id错误" + error, res)
    }
})

export default router