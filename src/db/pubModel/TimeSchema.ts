import mongoose from "mongoose"
import { Time } from "../../entities";

export interface ITime extends Time, mongoose.Document { }

const classSchema = new mongoose.Schema<ITime>({
    timeName: String,
    timeStart: String,
    timeEnd: String,
    termID: { type: mongoose.Types.ObjectId }
}, {
    versionKey: false
})

export default mongoose.model<ITime>("ems_pub_time", classSchema)