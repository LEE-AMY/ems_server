import Express from "express"

import AdminRouter from "./AdminRouter"
import LoginRouter from "./LoginRouter"
import { ResponseHelp } from "../ResponseHelp"
import { role } from "../../types"

const router = Express.Router()

router.use("/admin", AdminRouter)
router.use("/login", LoginRouter)

router.get("/role", (req, res) => {
    ResponseHelp.sendData(role, req, res)
})


export default router;
