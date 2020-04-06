import mongoose from "mongoose"
import { Student } from "../../entities"

export interface IStudent extends Student, mongoose.Document { }

const Schema = mongoose.Schema;

const StuSchema = new Schema<IStudent>({
    stuNo: { type: String, required: true, index: { unique: true } },
    pwd: String,
    clsID: { type: mongoose.Types.ObjectId },
    deptID: { type: mongoose.Types.ObjectId },
    loginTime: Number,
    status: Number,
    infID: { type: mongoose.Types.ObjectId },
    _index: Number
}, {
    versionKey: false
})

export default mongoose.model<IStudent>("ems_user_stu", StuSchema)