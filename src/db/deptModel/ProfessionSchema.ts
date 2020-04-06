import mongoose from "mongoose"
import { Profession } from "../../entities"

export interface IProfession extends Profession, mongoose.Document { }



const professionSchema = new mongoose.Schema<IProfession>({

    proName: String,
    deptID: { type:  mongoose.Types.ObjectId},
    descID: { type: mongoose.Types.ObjectId },
    status: Number

}, {
    versionKey: false
})

export default mongoose.model<IProfession>("ems_dept_pro", professionSchema)