import mongoose from "mongoose";
import { Department } from "../entities";

export interface IDepartment extends Department, mongoose.Document { }

const deptSchema = new mongoose.Schema<IDepartment>({

    deptName: String,
    address: String,
    phone: String,
    email: String,
    descID: String

}, {
    versionKey: false
})

export default mongoose.model<IDepartment>("ems_dept_inf", deptSchema);