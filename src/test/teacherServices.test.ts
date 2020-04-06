import { TeacherService } from "../services"

export async function addTch() {
    const adminObj: any = {
        tchNo: "String",
        pwd: "123456",
        deptID: "000000",
        loginTime: Date.now(),
        status: 1,
        infID: "",
        _index: 1
    }
    const result = await TeacherService.add(adminObj);

    console.log("addTch=>", result)
    return result;
}


