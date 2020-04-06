import mongoose from "mongoose"
import { OptCourse } from "../../entities";

export interface IOptCourse extends OptCourse, mongoose.Document { }

const optSchema = new mongoose.Schema<IOptCourse>({
    crsID: { type: mongoose.Types.ObjectId },
    termID: { type: mongoose.Types.ObjectId },
    stuID: { type: mongoose.Types.ObjectId },
    grade: Number,
    score: Number,
    status: Number
}, {
    versionKey: false
})

export default mongoose.model<IOptCourse>("ems_pub_opt", optSchema)