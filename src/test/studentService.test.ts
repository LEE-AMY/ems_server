import { StudentService } from "../services"

export async function add() {
    const stu: any = {
        stuNo: "20200001",
        pwd: "123123",
        clsID: "123",
        deptID: "123",
        loginTime: Date.now(),
        status: 1,
        infID: ""
    }
    const result = await StudentService.add(stu)

    // console.log("result=>", result)
    return result
}