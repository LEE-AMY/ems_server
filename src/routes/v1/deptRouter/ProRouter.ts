import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { DescriptionService, ProfessionService, DepartmentService } from "../../../services"
import { isValidObjectId } from "mongoose"
import { cloneObj } from "../../../utils"
import { IDescription } from "../../../db"

const router = express.Router()

router.post("", async (req, res) => {
    try {
        const { desc, ...pro } = req.body
        if (!isValidObjectId(pro.deptID)) {
            ResponseHelp.sendError("部门id类型不符合要求", req, res)
            return
        }
        const descResult = await DescriptionService.add(desc)
        if (Array.isArray(descResult)) {
            ResponseHelp.sendError(descResult, req, res)
            return
        }

        const proResult = await ProfessionService.add({ ...pro, descID: descResult._id })
        if (Array.isArray(proResult)) {
            await DescriptionService.delete(descResult._id)
            ResponseHelp.sendError(proResult, req, res)
            return
        }
        ResponseHelp.sendData(proResult, req, res)
    } catch (error) {
        ResponseHelp.sendError("error:" + error, req, res)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const pro = await ProfessionService.findByIdAndDelete(req.params.id)
        if (!pro) {
            ResponseHelp.sendError(`id[${req.params.id}]不存在`, req, res)
            return
        }
        await DescriptionService.delete(pro.descID)
        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError("error:" + error, req, res)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { _id, desc, descID: _, ...pro } = req.body
        const errs: string[] = []

        if (desc && desc._id) {
            const { _id: descID, ...nDesc } = desc
            const descResult = await DescriptionService.edit(descID, nDesc)
            if (Array.isArray(descResult)) { errs.push(...descResult) }
        }

        const proResult = await ProfessionService.edit(id, pro)
        if (Array.isArray(proResult)) { errs.push(...proResult) }
        if (errs.length) {
            ResponseHelp.sendError(errs, req, res)
        } else {
            ResponseHelp.sendData(true, req, res)
        }
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})



router.get("", async (req, res) => {
    try {
        const pros = await ProfessionService.find(req.query)
        if (pros.errors.length) {
            ResponseHelp.sendError(pros.errors, req, res)
            return
        }

        const descArr: Promise<IDescription | null>[] = []
        pros.data.forEach(pro => {
            descArr.push(DescriptionService.findById(pro.descID))
        });

        const result = await Promise.all(descArr)

        const nPros = pros.data.map((prop, index) => {
            const { descID, ...obj } = cloneObj(prop)
            obj.desc = result[index]
            return obj
        })
        pros.data = nPros
        ResponseHelp.sendPageData(pros, req, res)

    } catch (error) {
        ResponseHelp.sendError("error" + error, req, res)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const pro = await ProfessionService.findById(req.params.id)
        if (!pro) {
            ResponseHelp.sendError(`id[${req.params.id}]不存在`, req, res)
            return
        }
        const { _id, proName, status } = pro
        const obj = {
            _id,
            proName,
            status,
            dept: await DepartmentService.findById(pro.deptID),
            desc: await DescriptionService.findById(pro.descID)
        }
        ResponseHelp.sendData(obj, req, res)
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

export default router