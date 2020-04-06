import express from "express"
import DeptRouter from "./DepartmentRouter"
import ClassRouter from "./ClassRouter"
import ProRouter from "./ProRouter"
import CourseRouter from "./CourseRouter"

const router = express.Router()

router.use("/dept", DeptRouter)
router.use("/class", ClassRouter)
router.use("/pro", ProRouter)
router.use("/course", CourseRouter)

export default router