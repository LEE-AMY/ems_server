import Express from "express"

import AdminRouter from "./AdminRouter"
import LoginRouter from "./LoginRouter"
import { ResponseHelp } from "../ResponseHelp"
import { EDBName } from "../../types"

const router = Express.Router()

router.use("/admin", AdminRouter)
router.use("/login", LoginRouter)

const role = [
    { role: EDBName.Stu, name: "学生" },
    { role: EDBName.Tch, name: "教师" },
    { role: EDBName.Admin, name: "管理员" }
]

router.get("/role", (req, res) => {
    ResponseHelp.sendData(role, req, res)
})


export default router;
