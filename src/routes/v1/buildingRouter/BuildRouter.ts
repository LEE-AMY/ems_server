import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { DescriptionService, BuildingService } from "../../../services"
import { cloneObj } from "../../../utils"
import { IDescription } from "../../../db"

const router = express.Router()

router.post("", async (req, res) => {
    const desc = await DescriptionService.add(req.body.desc)
    try {
        if (Array.isArray(desc)) {
            ResponseHelp.sendError(desc, req, res)
            return
        }
        const result = await BuildingService.add({ ...req.body, descID: desc._id })
        if (Array.isArray(result)) {
            DescriptionService.delete(desc._id)
            ResponseHelp.sendError(result, req, res)
            return
        }
        ResponseHelp.sendData(result, req, res)
    } catch (error) {
        if (!Array.isArray(desc)) {
            DescriptionService.delete(desc._id)
        }
        ResponseHelp.sendError(error, req, res)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await BuildingService.findByIdAndDelete(id)
        if (!result) {
            ResponseHelp.sendError(`id[${id}]不存在`, req, res)
            return
        } else {
            await DescriptionService.delete(result.descID)
        }
        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await BuildingService.findById(id)
        if (!result) {
            ResponseHelp.sendError(`id[${id}]不存在`, req, res)
            return
        }
        const { descID, ...nOther } = cloneObj(result)
        nOther.desc = await DescriptionService.findById(result.descID)
        ResponseHelp.sendData(nOther, req, res)
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

router.get("", async (req, res) => {
    const result = await BuildingService.find(req.query)
    if (result.errors.length) {
        ResponseHelp.sendError(result.errors, req, res)
        return
    }

    const asyncDesc: Promise<IDescription | null>[] = []
    result.data.forEach(dept => {
        asyncDesc.push(DescriptionService.findById(dept.descID))
    })

    const descResult = await Promise.all(asyncDesc)
    const newBuilding = result.data.map((dept, index) => {
        const { descID, ...obj } = cloneObj(dept)
        obj.desc = descResult[index]
        return obj
    })

    result.data = newBuilding
    ResponseHelp.sendPageData(result, req, res)
})

router.put("/:id", async (req, res) => {
    try {
        const { _id, descID, desc, ...buildingBody } = req.body
        const building = await BuildingService.edit(req.params.id, buildingBody)
        if (Array.isArray(building) || building === null) {
            ResponseHelp.sendError(building ? building : "建筑物id错误" + req.params.id, req, res)
            return
        }
        if (desc) {
            const { _id: _, ...nDesc } = desc
            await DescriptionService.edit(building.descID, nDesc)
        }

        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError("建筑物id错误" + error, req, res)
    }
})

export default router