import express from "express"
import BuildRouter from "./BuildRouter"
import RoomRouter from "./RoomRouter"
import RoomUsedRouter from "./RoomUsedRouter"


const router = express.Router()

router.use("/build", BuildRouter)
router.use("/room", RoomRouter)
router.use("/roomUsed", RoomUsedRouter)


export default router