import Express from "express"
import loginRouter from "./loginRouter"

const router = Express.Router();


router.use("/login", loginRouter)

export default router;