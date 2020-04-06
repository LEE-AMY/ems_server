import express from "express"
import DescRouter from "./DescRouter"
import CourseTabRouter from "./CourseTabRouter"
import OptCourseRouter from "./OptCourseRouter"
import TermRouter from "./TermRouter"
import TimeRouter from "./TimeRouter"


const router = express.Router()

router.use("/desc", DescRouter)
router.use("/crsTab", CourseTabRouter)
router.use("/opt", OptCourseRouter)
router.use("/term", TermRouter)
router.use("/time", TimeRouter)

export default router