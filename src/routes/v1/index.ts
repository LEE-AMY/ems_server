import Express from "express"
import UserRouter from "./userRouter"
import DeptRouter from "./deptRouter"
import BuildRouter from "./buildingRouter"
import PubRouter from "./pubRouter"
import { ResponseHelp } from "../ResponseHelp"
import { roleCN } from "../../types"

const router = Express.Router()

router.use("/user", UserRouter)
router.use("/dept", DeptRouter)
router.use("/building", BuildRouter)
router.use("/pub", PubRouter)


router.get("/role", (req, res) => {
    ResponseHelp.sendData(roleCN, req, res)
})


export default router;
