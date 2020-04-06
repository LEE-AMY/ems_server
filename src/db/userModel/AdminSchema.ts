import mongoose from "mongoose"
import { Admin } from "../../entities"

export interface IAdmin extends Admin, mongoose.Document { }

const AdminSchema = new mongoose.Schema<IAdmin>({
    adminNo: { type: String, required: true, index: { unique: true } },
    pwd: String,
    name: String,
    role: String,
    status: Number
}, {
    versionKey: false
})

export default mongoose.model<IAdmin>("ems_user_admin", AdminSchema)
