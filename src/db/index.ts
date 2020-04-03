import mongoose from 'mongoose'
import AdminModel from "./AdminSchema"
import StudentModel from "./StudentSchema"
import UserBaseModel from "./UserBaseSchema"
import TeacherModel from "./TeacherSchema"
import DepartmentModel from "./DepartmentSchema"
import ClassModel from "./ClassSchema"

const dbURL = "mongodb://127.0.0.1:27017/ems";
mongoose.set("useCreateIndex", true)

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
    StudentModel,
    UserBaseModel,
    TeacherModel,
    DepartmentModel,
    ClassModel
}