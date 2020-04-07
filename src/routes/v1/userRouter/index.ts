import express from "express"
import AdminRouter from "./AdminRouter"
import LoginRouter from "./LoginRouter"
import StuRouter from "./StuRouter"
import TchRouter from "./TchRouter"

const router = express.Router()

router.use("/admin", AdminRouter)
router.use("/login", LoginRouter)
router.use("/stu", StuRouter)
router.use("/tch", TchRouter)


export default router