import Express from "express";
import v1Router from "./v1"
import UploadRouter from "./UploadRouter"
import { TCorsParams } from "../types";

const router = Express.Router();

// router.use((req, res, next) => {
//     console.log("Path:", req.originalUrl, "Time:", Date.now())
//     next()
// })

const defCors: TCorsParams = {
    origin: "*",
    headers: "Content-Type, Content-Length, Authorization, Accept, X-Requested-With",
    methods: "PUT, POST, GET, DELETE, OPTIONS"
}

router.all("*", (req, res, next) => {
    const nCors = {
        ...defCors,
        origin: `${req.protocol}://${req.headers.host}`,
        methods: req.method
    }
    res.header("Access-Control-Allow-Origin", nCors.origin)
    res.header("Access-Control-Allow-Headers", nCors.headers)
    res.header("Access-Control-Allow-Methods", nCors.methods)

    next()
})

router.use("/v1", v1Router)
router.use("/upload", UploadRouter)

export default router;