import { LoginService } from "../services"
import { LoginCondition } from "../entities"


export async function login() {
    const l: any = {
        userType: "teacher",
        userPwd: "123456",
        userName: "T20200001"
    }

    const result = await LoginService.login(l)

    console.log("login result :", result)
    return result
}

// login()