import mongoose from "mongoose"
import { ImgTab } from "../../entities"

export interface IImgTab extends ImgTab, mongoose.Document { }

const imgTabSchema = new mongoose.Schema<IImgTab>({
    useID: { type: mongoose.Types.ObjectId },
    avatar: Array,
    img: Array,
    status: Number
}, {
    versionKey: false
})

export default mongoose.model<IImgTab>("ems_pub_img", imgTabSchema)