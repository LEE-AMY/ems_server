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
            ResponseHelp.sendError(desc, res)
            return
        }
        const result = await BuildingService.add({ ...req.body, descID: desc._id })
        if (Array.isArray(result)) {
            DescriptionService.delete(desc._id)
            ResponseHelp.sendError(result, res)
            return
        }
        ResponseHelp.sendData(result, res)
    } catch (error) {
        if (!Array.isArray(desc)) {
            DescriptionService.delete(desc._id)
        }
        ResponseHelp.sendError(error, res)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await BuildingService.findByIdAndDelete(id)
        if (!result) {
            ResponseHelp.sendError(`id[${id}]不存在`, res)
            return
        } else {
            await DescriptionService.delete(result.descID)
        }
        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError(error, res)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await BuildingService.findById(id)
        if (!result) {
            ResponseHelp.sendError(`id[${id}]不存在`, res)
            return
        }
        const { descID, ...nOther } = cloneObj(result)
        nOther.desc = await DescriptionService.findById(result.descID)
        ResponseHelp.sendData(nOther, res)
    } catch (error) {
        ResponseHelp.sendError(error, res)
    }
})

router.get("", async (req, res) => {
    const result = await BuildingService.find(req.query)
    if (result.errors.length) {
        ResponseHelp.sendError(result.errors, res)
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
    ResponseHelp.sendPageData(result, res)
})

router.put("/:id", async (req, res) => {
    try {
        const { _id, descID, desc, ...buildingBody } = req.body
        const building = await BuildingService.edit(req.params.id, buildingBody)
        if (Array.isArray(building) || building === null) {
            ResponseHelp.sendError(building ? building : "建筑物id错误" + req.params.id, res)
            return
        }
        if (desc) {
            const { _id: _, ...nDesc } = desc
            await DescriptionService.edit(building.descID, nDesc)
        }

        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError("建筑物id错误" + error, res)
    }
})

export default router