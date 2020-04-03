import Express from "express";
import v1Router from "./v1"

const router = Express.Router();

router.use((req, res, next) => {

    console.log("Path:", req.originalUrl, "Time:", Date.now())
    next()
})

// router.use("/v1", v1Router)

export default router;