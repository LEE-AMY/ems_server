import mongoose from "mongoose"
import { Room } from "../../entities"

export interface IRoom extends Room, mongoose.Document { }

const roomSchema = new mongoose.Schema<IRoom>({

    roomNo: String,
    roomType: String,
    roomFloor: Number,
    capacity: Number,
    buildID: { type:  mongoose.Types.ObjectId},
    status: Number
}, {
    versionKey: false
})


export default mongoose.model<IRoom>("ems_build_room", roomSchema)