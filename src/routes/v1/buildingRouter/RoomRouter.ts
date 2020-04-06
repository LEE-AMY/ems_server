import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { RoomService } from "../../../services"


const router = express.Router()

router.post("", async (req, res) => {
    try {
        const result = await RoomService.add(req.body)
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
        const result = await RoomService.findByIdAndDelete(id)
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
        const result = await RoomService.findById(id)
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
    const result = await RoomService.find(req.query)
    ResponseHelp.sendPageData(result, req, res)
})

router.put("/:id", async (req, res) => {
    try {
        const { _id,  ...roomBody } = req.body
        const room = await RoomService.edit(req.params.id, roomBody)
        if (Array.isArray(room) || room === null) {
            ResponseHelp.sendError(room ? room : "教室id错误" + req.params.id, req, res)
            return
        }
        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError("教室id错误" + error, req, res)
    }
})

export default router