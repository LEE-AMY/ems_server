import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { CourseService, DescriptionService } from "../../../services"
import { cloneObj } from "../../../utils"
import { IDescription } from "../../../db"

const router = express.Router()

router.post("", async (req, res) => {
    try {
        const desc = await DescriptionService.add(req.body.desc)
        if (Array.isArray(desc)) {
            ResponseHelp.sendError(desc, res)
            return
        }
        const result = await CourseService.add({ ...req.body, descID: desc._id })
        if (Array.isArray(result)) {
            await DescriptionService.delete(desc._id)
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
        const course = await CourseService.findByIdAndDelete(id)
        if (!course) {
            ResponseHelp.sendError(`id[${id}]不存在`, res)
            return
        } else {
            await DescriptionService.delete(course.descID)
        }
        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError(error, res)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const course = await CourseService.findById(id)
        if (!course) {
            ResponseHelp.sendError(`id[${id}]不存在`, res)
            return
        }
        const { descID, ...nOther } = cloneObj(course)
        nOther.desc = await DescriptionService.findById(course.descID)
        ResponseHelp.sendData(nOther, res)
    } catch (error) {
        ResponseHelp.sendError(error, res)
    }
})

router.get("", async (req, res) => {
    const result = await CourseService.find(req.query)
    if (result.errors.length) {
        ResponseHelp.sendError(result.errors, res)
        return
    }

    const asyncDesc: Promise<IDescription | null>[] = []
    result.data.forEach(dept => {
        asyncDesc.push(DescriptionService.findById(dept.descID))
    })

    const descResult = await Promise.all(asyncDesc)
    const newCourse = result.data.map((dept, index) => {
        const { descID, ...obj } = cloneObj(dept)
        obj.desc = descResult[index]
        return obj
    })

    result.data = newCourse
    ResponseHelp.sendPageData(result, res)
})

router.put("/:id", async (req, res) => {
    try {
        const { _id, descID, desc, ...courseBody } = req.body
        const course = await CourseService.edit(req.params.id, courseBody)
        if (Array.isArray(course) || course === null) {
            ResponseHelp.sendError(course ? course : "课程id错误", res)
            return
        }
        if (desc) {
            const { _id: _, ...nDesc } = desc
            await DescriptionService.edit(course.descID, nDesc)
        }

        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError("课程id错误", res)
    }
})

export default router