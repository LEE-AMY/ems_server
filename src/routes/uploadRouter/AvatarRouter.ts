import express from "express"
import multer from "multer"
import Path from "path"
import { ResponseHelp } from "../ResponseHelp"
import { ImgTabService } from "../../services/pubServe/ImgTabService";
import { ImgTab } from "../../entities";

const diskPath = "/upload/avatar";

const router = express.Router()

const allowedExtensions = [".jpg", ".png", ".gif", ".bmp", ".jiff"];

const storage = multer.diskStorage({
    destination: Path.resolve(__dirname, `../../../public${diskPath}`),
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

    // ImgTabService.add()
    upload(req, res, err => {
        if (err) {
            res.send(err)
        } else {
            const url = `${diskPath}/${req.file.filename}`;
            res.send(url)

            const obj: any = {
                useID: req.params.id,
                avatar: [{
                    path: "12345",
                    status: 1
                }],
                img: [],
                status: 1
            }
        }
    })
})


export default router