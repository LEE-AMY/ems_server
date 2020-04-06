import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { DepartmentService, DescriptionService } from "../../../services"
import { cloneObj } from "../../../utils"
import { IDescription } from "../../../db"

const router = express.Router()

/**
 * 增加学院
 */
router.post("", async (req, res) => {
    try {
        const desc = await DescriptionService.add(req.body.desc)
        if (Array.isArray(desc)) {
            ResponseHelp.sendError(desc, req, res)
            return
        }
        const dept = await DepartmentService.add({ ...req.body, descID: desc._id })
        if (Array.isArray(dept)) {
            await DescriptionService.delete(desc._id)
            ResponseHelp.sendError(dept, req, res)
        } else {
            const { descID, ...nDept } = cloneObj(dept)
            nDept.desc = desc
            ResponseHelp.sendData(nDept, req, res)
        }
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

/**
 * 删除学院
 */
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const dept = await DepartmentService.findByIdAndDelete(id)
        if (!dept) {
            ResponseHelp.sendError(`id[${id}]不存在`, req, res)
            return
        } else {
            await DescriptionService.delete(dept.descID)
        }
        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

/**
 * 查找学院
 */

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const dept = await DepartmentService.findById(id)
        if (!dept) {
            ResponseHelp.sendError(`id[${id}]不存在`, req, res)
            return
        }
        const { descID, ...nDept } = cloneObj(dept)
        nDept.desc = await DescriptionService.findById(dept.descID)
        ResponseHelp.sendData(nDept, req, res)
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

/**
 * 获取学院列表
 */

router.get("", async (req, res) => {
    const result = await DepartmentService.find(req.query)
    if (result.errors.length) {
        ResponseHelp.sendError(result.errors, req, res)
        return
    }

    const asyncDesc: Promise<IDescription | null>[] = []
    result.data.forEach(dept => {
        asyncDesc.push(DescriptionService.findById(dept.descID))
    })

    const descResult = await Promise.all(asyncDesc)
    const newDept = result.data.map((dept, index) => {
        const { descID, ...obj } = cloneObj(dept)
        obj.desc = descResult[index]
        return obj
    })

    result.data = newDept
    ResponseHelp.sendPageData(result, req, res)
})

/**
 * 修改学院信息
 */
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { _id, desc, descID: _, ...dept } = req.body
        const errs: string[] = []

        if (desc && desc._id) {
            const { _id: descID, ...nDesc } = desc
            const descResult = await DescriptionService.edit(descID, nDesc)
            if (Array.isArray(descResult)) { errs.push(...descResult) }
        }

        const deptResult = await DepartmentService.edit(id, dept)
        if (Array.isArray(deptResult)) { errs.push(...deptResult) }
        if (errs.length) {
            ResponseHelp.sendError(errs, req, res)
        } else {
            ResponseHelp.sendData(true, req, res)
        }
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

export default router