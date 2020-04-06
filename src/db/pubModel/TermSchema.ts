import mongoose from "mongoose"
import { Term } from "../../entities";

export interface ITerm extends Term, mongoose.Document { }

const classSchema = new mongoose.Schema<ITerm>({
    termName: String,
    fromDate: Number,
    toDate: Number,
    status: Number
}, {
    versionKey: false
})

export default mongoose.model<ITerm>("ems_pub_term", classSchema)
