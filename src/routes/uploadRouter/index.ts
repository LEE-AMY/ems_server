import express from "express"
import AvatarRouter from "./AvatarRouter"

const router = express.Router()
router.use("/avatar", AvatarRouter)

export default router