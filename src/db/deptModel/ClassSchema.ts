import mongoose from "mongoose"
import { ClassC } from "../../entities"

export interface IClass extends ClassC, mongoose.Document { }

const classSchema = new mongoose.Schema<IClass>({
    stuCnt: Number,
    proID: { type:  mongoose.Types.ObjectId},
    tchNo: { type:  mongoose.Types.ObjectId},
    status: Number
}, {
    versionKey: false
})

export default mongoose.model<IClass>("ems_dept_cls", classSchema)