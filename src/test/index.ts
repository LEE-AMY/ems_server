import "reflect-metadata"
import "../db"
import { addAdmin, updateAdmin, findAdmin, deleteAmin } from "./adminServices.test"
import { addStu } from "./studentService.test"
import { addTch } from "./teacherServices.test"
import { login } from "./loginService.test"
import { ClassService } from "../services"

setTimeout(() => {
    console.log("===")
    // addAdmin()
    addStu()
    // addTch()
}, 10000);

// updateAdmin()

// findAdmin("admin1")

// deleteAmin("admin4")

// login()
