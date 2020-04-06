import mongoose from "mongoose"
import { CourseTab } from "../../entities";

export interface ICourseTab extends CourseTab, mongoose.Document { }

const courseSchema = new mongoose.Schema<ICourseTab>({
    tchID: { type: mongoose.Types.ObjectId },
    crsID: { type: mongoose.Types.ObjectId },
    termID: { type: mongoose.Types.ObjectId },
    useRoom: { type: mongoose.Types.ObjectId },
    total: Number,
    surplus: Number,
    status: Number
}, {
    versionKey: false
})

export default mongoose.model<ICourseTab>("ems_pub_crs", courseSchema)