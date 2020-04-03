import mongoose from "mongoose"
import { Student } from "../entities"

export interface IStudent extends Student, mongoose.Document { }

const Schema = mongoose.Schema;

const StuSchema = new Schema<IStudent>({
    stuNo: { type: String, required: true, index: { unique: true } },
    pwd: { type: String, required: true },
    clsID: { type: Schema.Types.ObjectId, required: true },
    deptID: { type: Schema.Types.ObjectId, required: true },
    loginTime: { type: Number, required: true },
    status: { type: Number, required: true },
    infID: { type: Schema.Types.ObjectId, required: true },
    _index: { type: Number, required: true }
}, {
    versionKey: false
})

export default mongoose.model<IStudent>("ems_user_stu", StuSchema)