import mongoose from "mongoose"
import { UserInf } from "../entities"

export interface IUserBase extends UserInf, mongoose.Document { }

const UserInfSchema = new mongoose.Schema<IUserBase>({
    name: String,
    sex: Number,
    birth: String,
    idNo: String,
    joinDate: Number,
    address: String,
    phone: String,
    email: String,
    descID: String

}, {
    versionKey: false
})

export default mongoose.model<IUserBase>("ems_user_base", UserInfSchema)