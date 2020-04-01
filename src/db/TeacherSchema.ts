import mongoose from "mongoose"
import { Teacher } from "../entities"

export interface ITeacher extends Teacher, mongoose.Document { }


const teacherSchema = new mongoose.Schema<ITeacher>({
    tchNo: String,
    pwd: String,
    deptID: String,
    loginTime: Number,
    status: Number,
    infID: String
})


export default mongoose.model<ITeacher>("ems_user_tch", teacherSchema)
