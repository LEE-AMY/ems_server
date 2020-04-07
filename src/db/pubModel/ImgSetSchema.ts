import mongoose from "mongoose"
import { ImgSet } from "../../entities"

export interface IImgSet extends ImgSet, mongoose.Document { }

const imgSetSchema = new mongoose.Schema<IImgSet>({
    useID: { type: mongoose.Types.ObjectId },
    type: String,
    url: String,
    setName: String,
    upTime: Number,
    status: Number

}, {
    versionKey: false
})

export default mongoose.model<IImgSet>("ems_pub_img", imgSetSchema)