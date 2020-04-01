import mongoose from "mongoose"
import { Student } from "../entities"

export interface IStudent extends Student, mongoose.Document { }

let num = 0
const StuSchema = new mongoose.Schema<IStudent>({
    stuNo: String,
    pwd: String,
    clsID: String,
    deptID: String,
    loginTime: Number,
    status: Number,
    infID: String,
    _index: Number
})

StuSchema.path("_index").set(v => {
    return ++num
})

StuSchema.path("stuNo").set(v => {
    console.log("====")
    return `${new Date().getFullYear()}${(num).toString().padStart(5, "0")}`
})



const stuModel = mongoose.model<IStudent>("ems_user_stu", StuSchema)


const findQuery = stuModel.find().sort({ _index: -1 }).limit(1);
findQuery.exec((err, maxResult) => {
    if (err) {
        return err;
    }
    num = maxResult && maxResult[0] && maxResult[0]._index || num
    console.log("maxResult", maxResult)
})


export default stuModel