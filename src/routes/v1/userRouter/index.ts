import express from "express"
import AdminRouter from "./AdminRouter"
import LoginRouter from "./LoginRouter"

const router = express.Router()

router.use("/admin", AdminRouter)
router.use("/login", LoginRouter)


export default router