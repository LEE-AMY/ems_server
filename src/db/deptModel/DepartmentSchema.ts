import mongoose from "mongoose"
import { Department } from "../../entities"

export interface IDepartment extends Department, mongoose.Document { }

const deptSchema = new mongoose.Schema<IDepartment>({

    deptName: String,
    address: String,
    phone: String,
    email: String,
    descID: { type:  mongoose.Types.ObjectId}

}, {
    versionKey: false
})

export default mongoose.model<IDepartment>("ems_dept_dept", deptSchema);