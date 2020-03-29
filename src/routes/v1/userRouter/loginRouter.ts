import Express from "express"
import { ResponseHelp } from "../../ResponseHelp";
import services from "../../../services"
import { AdminService } from "../../../services/AdminService";


const router = Express.Router();

router.get("", async (req, res) => {
    const id = req.params.id || req.query.id;
    const type = String(req.query.type);

    if (!id || !type) {
        ResponseHelp.sendError("账号和用户角色类型不能为空", req, res)
        return;
    }

    const obj = {
        adminNo: "admin",
        pwd: "123",
        name: "张山",
        role: "admin",
        status: 0
    }

    // const result = await AdminService.add(obj)

    // services.Login.findByAccount(id, type)

    // ResponseHelp.sendData(result, req, res)
})

router.get("")

export default router;