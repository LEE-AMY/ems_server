import mongoose from "mongoose"
import { Description } from "../../entities";

export interface IDescription extends Description, mongoose.Document { }

const classSchema = new mongoose.Schema<IDescription>({

    descTitle: String,
    descSummary: String,
    descDetail: String,
    author: String
}, {
    versionKey: false
})

export default mongoose.model<IDescription>("ems_pub_desc", classSchema)