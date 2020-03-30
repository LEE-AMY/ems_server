import mongoose from 'mongoose'
import AdminModel from "./AdminSchema"
import StudentSchema from "./StudentSchema"
import UserBaseSchema from "./UserBaseSchema"

const dbURL = "mongodb://127.0.0.1:27017/ems";

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connect mongodb success");
}).catch((e) => {
    console.log(`connect mongodb failed ${e}`);
})

export {
    AdminModel,
    StudentSchema,
    UserBaseSchema
}