import mongoose from "mongoose"
import { Profession } from "../entities"

export interface IProfession extends Profession, mongoose.Document { }

const professionSchema = new mongoose.Schema<IProfession>({

    proName: String,
    deptID: String,
    descID: String,
    status: Number

}, {
    versionKey: false
})

export default mongoose.model<IProfession>("ems_dept_pro", professionSchema)