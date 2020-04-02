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

    console.log("result=>", result)
    return result
}

export async function edit() {
    const stu: any = {
        stuNo: "202099999",
        infID: "",
        pwd: "abcabcf",
        _index: 123
    }

    const result = await StudentService.edit("5e85a2867ef4e6479c78c33b", stu)
    console.log("edit", result)
    return result
}