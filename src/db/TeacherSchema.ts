import mongoose from "mongoose"
import { Teacher } from "../entities"

export interface ITeacher extends Teacher, mongoose.Document { }

const TchSchema = new mongoose.Schema<ITeacher>({
    tchNo: String,
    pwd: String,
    deptID: String,
    loginTime: Number,
    status: Number,
    infID: String,
    _index: Number
}, {
    versionKey: false
})

export default mongoose.model<ITeacher>("ems_user_tch", TchSchema)


