import mongoose from "mongoose"
import { RoomUsed } from "../../entities"

export interface IRoomUsed extends RoomUsed, mongoose.Document { }

const roomUsedSchema = new mongoose.Schema<IRoomUsed>({
    useType: String,
    useCrsID: String,
    useWeek: Number,
    fromDate: String,
    toDate: String,
    timeID: { type: mongoose.Types.ObjectId },
    termID: { type: mongoose.Types.ObjectId },
    roomID: { type: mongoose.Types.ObjectId },
    status: Number
}, {
    versionKey: false
})


export default mongoose.model<IRoomUsed>("ems_build_used", roomUsedSchema)