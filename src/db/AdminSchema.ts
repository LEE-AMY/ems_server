import Mongoose from "mongoose"
import { Admin } from "../entities"

export interface IAdmin extends Admin, Mongoose.Document { }

const AdminSchema = new Mongoose.Schema<IAdmin>({
    adminNo: String,
    pwd: String,
    name: String,
    role: String,
    status: Number
}, {
    versionKey: false
})

export default Mongoose.model<IAdmin>("EMS_USER_ADMIN", AdminSchema)

