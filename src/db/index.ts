import mongoose from 'mongoose'
import { BuildingModel, RoomModel, RoomUsedModel, IBuilding, IRoom, IRoomUsed } from './buildModel'
import { DepartmentModel, ClassModel, ProfessionModel, CourseModel, IDepartment, IClass, IProfession, ICourse } from './deptModel';
import { CourseTabModel, DescriptionModel, OptCourseModel, TermModel, TimeModel, ICourseTab, IDescription, IOptCourse, ITerm, ITime } from './pubModel';
import { AdminModel, StudentModel, UserBaseModel, TeacherModel, IAdmin, IStudent, IUserBase, ITeacher } from './userModel';

const dbURL = "mongodb://127.0.0.1:27017/ems";
mongoose.set("useCreateIndex", true)

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("connect mongodb success");
}).catch((e) => {
    console.log(`connect mongodb failed ${e}`);
})

export {
    BuildingModel,
    RoomModel,
    RoomUsedModel,
    DepartmentModel,
    ClassModel,
    ProfessionModel,
    CourseModel,
    CourseTabModel,
    DescriptionModel,
    OptCourseModel,
    TermModel,
    TimeModel,
    AdminModel,
    StudentModel,
    UserBaseModel,
    TeacherModel,
    IAdmin,
    IStudent,
    IUserBase,
    ITeacher,
    ICourseTab,
    IDescription,
    IOptCourse,
    ITerm,
    ITime,
    IDepartment,
    IClass,
    IProfession,
    ICourse,
    IBuilding,
    IRoom,
    IRoomUsed
}