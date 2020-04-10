import express from "express"
import multer from "multer"
import Path from "path"
import { ResponseHelp } from "../ResponseHelp"
import { EImgType } from "../../types"
import { ImgSetService } from "../../services/pubServe/ImgSetService"
import { cloneObj, deleteFile } from "../../utils"

const router = express.Router()
const diskPath = "/upload/avatar"
const destination = Path.resolve(__dirname, `../../../public${diskPath}`)
const allowedExtensions = [".jpg", ".png", ".gif", ".bmp", ".jiff"];
const storage = multer.diskStorage({
    destination,
    filename(req, file, cb) {
        const time = Date.now()
        const extname = Path.extname(file.originalname)
        cb(null, `${time}${extname}`)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter(req, file, cb) {
        const extname = Path.extname(file.originalname)
        if (allowedExtensions.includes(extname)) {
            cb(null, true)
        } else {
            cb(new Error(`暂不支持[${extname}]文件类型`))
        }
    }
}).single("avatar")

router.post("/:id", (req, res) => {
    upload(req, res, async err => {
        if (err) {
            ResponseHelp.sendError(err, res)
            return
        }
        const url = `${diskPath}/${req.file.filename}`
        const imgSet: any = {
            useID: req.params.id,
            type: EImgType.avatar,
            url,
            setName: "avatar"
        }

        try {
            const result = await ImgSetService.add(imgSet)

            if (Array.isArray(result)) {
                deleteFile(`${destination}/${req.file.filename}`)
                ResponseHelp.sendError(result, res)
                return
            }

            const obj = cloneObj(result)
            obj.url = url
            ResponseHelp.sendData(obj, res)
        } catch (error) {
            deleteFile(`${destination}/${req.file.filename}`)
            ResponseHelp.sendError(`id[${req.params.id}]错误`, res)
        }
    })
})


export default router