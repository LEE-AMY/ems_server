import mongoose from "mongoose"
import { Admin } from "../entities"
import bcrypt, { hash } from "bcrypt"

export interface IAdmin extends Admin, mongoose.Document { }

const AdminSchema = new mongoose.Schema<IAdmin>({
    adminNo: { type: String, required: true, index: { unique: true } },
    pwd: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: Number, required: true }
}, {
    versionKey: false
})

export default mongoose.model<IAdmin>("ems_user_admin", AdminSchema)

// const SALT_WORK_FACTOR = 5

// AdminSchema.pre('save', function (next) {
//     const user = this;
//     if (!user.isModified('pwd')) return next();
//     // 产生一个salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//         if (err) return next(err);
//         // 结合salt产生新的hash
//         bcrypt.hash(user.pwd, salt, function (err, hash) {
//             if (err) return next(err);
//             // 使用hash覆盖明文密码
//             user.pwd = hash;
//             next();
//         });
//     });
// });