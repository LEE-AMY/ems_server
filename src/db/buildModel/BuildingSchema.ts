import mongoose from "mongoose"
import { Building } from "../../entities"

export interface IBuilding extends Building, mongoose.Document { }

const buildSchema = new mongoose.Schema<IBuilding>({

    buildNo: { type: String, index: { unique: true } },
    buildName: String,
    buildAddress: String,
    manager: String,
    connectInf: String,
    buildDate: Number,
    floor: Number,
    status: Number,
    descID: { type: mongoose.Types.ObjectId },
}, {
    versionKey: false
})

export default mongoose.model<IBuilding>("ems_build_build", buildSchema)