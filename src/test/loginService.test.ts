import { LoginService } from "../services"
import { LoginCondition } from "../entities"


export async function login() {
    const l: any = {
        userType: "admin",
        userPwd: "123123",
        userName: "admin"
    }

    const result = await LoginService.login(l)

    console.log("login result :", result)
}

// login()