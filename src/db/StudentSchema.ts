import mongoose from "mongoose"
import { Student } from "../entities"

export interface IStudent extends Student, mongoose.Document { }

const StuSchema = new mongoose.Schema<IStudent>({
    stuNo: String,
    pwd: String,
    clsID: String,
    deptID: String,
    loginTime: Number,
    status: Number,
    infID: String,
    _index: Number
}, {
    versionKey: false
})

export default mongoose.model<IStudent>("ems_user_stu", StuSchema)