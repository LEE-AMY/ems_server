import { AdminService } from "../services"

export async function addAdmin() {
    const adminObj: any = {
        adminNo: "admin4",
        pwd: "123123",
        name: "王五",
        role: "admin",
        status: 0
    }
    const result = await AdminService.add(adminObj);

    console.log("addAdmin=>", result)
    return result;
}

export async function deleteAmin(admin: string) {
    const result = await AdminService.delete(admin)

    console.log("deleteAdmin=>", result)
    return result
}

export async function updateAdmin() {
    const admin: any = {
        adminNo: "admin-456",
        pwd: "1234567890",
        name: "张三",
        _id: "1213"
    }

    const result = await AdminService.edit("admin4", admin)
    console.log("updateAdmin=>", result)
    return result
}

export async function findAdmin(admin: string) {
    const result = await AdminService.findByAccount(admin)
    console.log("findAdmin=>", result)
    return result
}


