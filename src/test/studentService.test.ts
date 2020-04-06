import { StudentService } from "../services"

export async function addStu() {
    const stu: any = {
        stuNo: "20200001",
        pwd: "abcabc",
        clsID: "5e8877fd3826330ee45d7b1a",
        deptID: "5e8877fd3826330ee45d7b1a",
        loginTime: Date.now(),
        status: 1,
        infID: ""
    }
    const result = await StudentService.add(stu)

    console.log("addStu=>", result)
    return result
}

export async function edit() {
    const stu: any = {
        stuNo: "20200001",
        pwd: "cdcdcdcd",
        clsID: "34567890",
        deptID: "2345678",
        loginTime: Date.now(),
        status: 1,
        infID: "12345"
    }

    const result = await StudentService.edit("202000001", stu)
    console.log("edit", result)
    return result
}