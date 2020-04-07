import express from "express"
import { UserBaseService, DescriptionService, StudentService } from "../../../services"
import { IUserBase, IDescription } from "../../../db"
import { ResponseHelp } from "../../ResponseHelp"
import { cloneObj } from "../../../utils"

const router = express.Router()

router.post("", async (req, res) => {
    const { desc = {}, baseInfo, ...other } = req.body

    const result = await createBaseInfo(baseInfo, desc)
    if (Array.isArray(result)) {
        ResponseHelp.sendError(result, req, res)
        return
    }
    const stu = await StudentService.add({ ...other, infID: result })
    if (Array.isArray(stu)) {
        ResponseHelp.sendError(stu, req, res)
        return
    }

    ResponseHelp.sendData(stu, req, res)
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const stu = await StudentService.findOneAndDelete(id)
        if (!stu) {
            ResponseHelp.sendError(`学号[${id}]不存在`, req, res)
            return
        }

        if (stu.infID) {
            const ub = await UserBaseService.findByIdAndDelete(stu.infID)

            if (ub && ub.descID) {
                DescriptionService.delete(ub.descID)
            }
        }

        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { desc = {}, baseInfo = {}, infID, _id, _index, stuNo, ...other } = req.body
        const stu = await StudentService.edit(id, other)
        if (Array.isArray(stu) || stu === null) {
            ResponseHelp.sendError(stu ? stu : `学号[${id}]不存在`, req, res)
            return
        }
        if (Object.keys(baseInfo).length === 0 && Object.keys(desc).length === 0) {
            ResponseHelp.sendData(true, req, res)
            return
        }

        if (stu.infID) {
            const { _id: _, descID, ...nBaseInfo } = baseInfo
            const ub = await UserBaseService.edit(stu.infID, nBaseInfo)
            if (Array.isArray(ub) || ub === null) {
                ResponseHelp.sendError(ub ? ub : `baseInfo id[${stu.infID}]不存在`, req, res)
                return
            }
            const { _id: __, ...nDesc } = desc
            DescriptionService.edit(ub.descID, nDesc)
            ResponseHelp.sendData(true, req, res)
            return
        }

        const result = await createBaseInfo(baseInfo, desc)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, req, res)
            return
        }

        StudentService.edit(id, { infID: result } as any)
        ResponseHelp.sendData(true, req, res)
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const stuNo = req.params.id
        const stu = await StudentService.findByAccount(stuNo)
        if (!stu) {
            ResponseHelp.sendError(`学号[${stuNo}]不存在`, req, res)
            return
        }

        let ub: IUserBase | null = null
        let desc: IDescription | null = null
        if (stu.infID) {
            ub = await UserBaseService.findById(stu.infID)

            if (ub && ub.descID) {
                desc = await DescriptionService.findById(ub.descID)
            }
        }

        const nStu = cloneObj(stu)
        nStu.baseInfo = ub ? ub : {}
        nStu.desc = desc ? desc : {}

        ResponseHelp.sendData(nStu, req, res)
    } catch (error) {
        ResponseHelp.sendError(error, req, res)
    }
})

router.get("", async (req, res) => {
    const stuArr = await StudentService.find(req.query)
    ResponseHelp.sendPageData(stuArr, req, res)
})

export default router


async function createBaseInfo(baseInfo, desc) {
    let bInfo: string[] | IUserBase
    let nDesc: string[] | IDescription
    if (baseInfo) {
        bInfo = await UserBaseService.add(baseInfo)
        if (Array.isArray(bInfo)) {
            return bInfo
        }

        nDesc = await DescriptionService.add(desc)

        if (Array.isArray(nDesc)) {
            UserBaseService.findByIdAndDelete(bInfo._id)
            return nDesc
        }
        await UserBaseService.edit(bInfo._id, { descID: nDesc._id } as any)
        return bInfo._id as string
    }

    return ""
}