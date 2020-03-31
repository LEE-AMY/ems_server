import mongoose from "mongoose"
import { Student } from "../entities"

export interface IStudent extends Student, mongoose.Document { }

const StuSchema = new mongoose.Schema<IStudent>({
    stuNo: String,
    pwd: String,
    infID: String,
    clsID: String,
    loginTime: Number,
    status: Number
})

export default mongoose.model<IStudent>("ems_user_stu", StuSchema)