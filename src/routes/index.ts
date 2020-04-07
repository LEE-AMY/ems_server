import Express from "express";
import v1Router from "./v1"
import UploadRouter from "./UploadRouter"

const router = Express.Router();

router.use((req, res, next) => {
    console.log("Path:", req.originalUrl, "Time:", Date.now())
    next()
})

router.use("/v1", v1Router)
router.use("/upload", UploadRouter)

export default router;