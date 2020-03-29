import Express from "express";
import userRouter from "./userRouter"

const router = Express.Router();

router.use("/user", userRouter)


export default router;
