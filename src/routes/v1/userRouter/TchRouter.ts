import express from "express"
import { ResponseHelp } from "../../ResponseHelp"
import { cloneObj } from "../../../utils"
import { TeacherService, UserBaseService, DescriptionService } from "../../../services"
import { IUserBase, IDescription } from "../../../db"

const router = express.Router()

router.post("", async (req, res) => {
    const { desc = {}, baseInfo, ...other } = req.body

    const result = await createBaseInfo(baseInfo, desc)
    if (Array.isArray(result)) {
        ResponseHelp.sendError(result, res)
        return
    }
    const tch = await TeacherService.add({ ...other, infID: result })
    if (Array.isArray(tch)) {
        ResponseHelp.sendError(tch, res)
        return
    }

    ResponseHelp.sendData(tch, res)
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const tch = await TeacherService.findOneAndDelete(id)
        if (!tch) {
            ResponseHelp.sendError(`工号[${id}]不存在`, res)
            return
        }

        if (tch.infID) {
            const ub = await UserBaseService.findByIdAndDelete(tch.infID)

            if (ub && ub.descID) {
                DescriptionService.delete(ub.descID)
            }
        }

        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError(error, res)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { desc = {}, baseInfo = {}, infID, _id, _index, tchNo, ...other } = req.body
        const tch = await TeacherService.edit(id, other)
        if (Array.isArray(tch) || tch === null) {
            ResponseHelp.sendError(tch ? tch : `工号[${id}]不存在`, res)
            return
        }
        if (Object.keys(baseInfo).length === 0 && Object.keys(desc).length === 0) {
            ResponseHelp.sendData(true, res)
            return
        }

        if (tch.infID) {
            const { _id: _, descID, ...nBaseInfo } = baseInfo
            const ub = await UserBaseService.edit(tch.infID, nBaseInfo)
            if (Array.isArray(ub) || ub === null) {
                ResponseHelp.sendError(ub ? ub : `baseInfo id[${tch.infID}]不存在`, res)
                return
            }
            const { _id: __, ...nDesc } = desc
            DescriptionService.edit(ub.descID, nDesc)
            ResponseHelp.sendData(true, res)
            return
        }

        const result = await createBaseInfo(baseInfo, desc)
        if (Array.isArray(result)) {
            ResponseHelp.sendError(result, res)
            return
        }

        TeacherService.edit(id, { infID: result } as any)
        ResponseHelp.sendData(true, res)
    } catch (error) {
        ResponseHelp.sendError(error, res)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const stuNo = req.params.id
        const tch = await TeacherService.findByAccount(stuNo)
        if (!tch) {
            ResponseHelp.sendError(`工号[${stuNo}]不存在`, res)
            return
        }

        let ub: IUserBase | null = null
        let desc: IDescription | null = null
        if (tch.infID) {
            ub = await UserBaseService.findById(tch.infID)

            if (ub && ub.descID) {
                desc = await DescriptionService.findById(ub.descID)
            }
        }

        const nStu = cloneObj(tch)
        nStu.baseInfo = ub ? ub : {}
        nStu.desc = desc ? desc : {}

        ResponseHelp.sendData(nStu, res)
    } catch (error) {
        ResponseHelp.sendError(error, res)
    }
})

router.get("", async (req, res) => {
    const tchArr = await TeacherService.find(req.query)
    ResponseHelp.sendPageData(tchArr, res)
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