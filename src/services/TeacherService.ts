import { Teacher } from "../entities";
import { TeacherModel } from "../db";
import { pwdType } from "../types";
import { ITeacher } from "../db/TeacherSchema";

export class TeacherService {

    @getTchIndex
    private static index: number = 0
    private static year: number = 0
    private static len: number = 4

    private static get tchNo(): string {
        const ny = new Date().getFullYear()
        if (ny !== this.year) {
            this.index = 0
            this.year = ny
        }
        this.index += 1
        return `T${this.year}${(this.index).toString().padStart(this.len, "0")}`;
    }

    public static async add(tch: Teacher) {
        tch = Teacher.transform(tch);
        const errs = await tch.validateThis();
        if (errs.length) {
            return errs;
        }

        tch.tchNo = this.tchNo;
        tch._index = this.index;
        const result = await TeacherModel.create(tch);
        result.pwd = pwdType;
        return result;
    }

    public static async edit(_id: string, tch: Teacher) {
        const newTch = Teacher.transform(tch);
        const errs = await newTch.validateThis(true);
        if (errs.length) return errs;

        const { _index, tchNo, ...updateTch } = newTch

        TeacherModel.updateOne({ _id }, updateTch);
        return errs;
    }

    public static async findById(id: string) {
        return await TeacherModel.findById(id)
    }

    public static async deleteById(_id: string) {
        await TeacherModel.deleteOne({ _id })
        return true
    }

    public static async loginValidate(tchNo: string, pwd: string) {
        const result = await TeacherModel.findOne({ tchNo, pwd })
        if (result) result.pwd = pwdType
        return result
    }
}


function getTchIndex(target: any, prop: string) {

    const year = target.year = new Date().getFullYear()

    TeacherModel.find({ tchNo: { $regex: new RegExp(`^(T${year})`) } })
        .sort({ _index: -1 })
        .limit(1)
        .exec((err, maxResult) => {
            if (err) {
                return err;
            }
            target[prop] = maxResult && maxResult[0] && maxResult[0]._index || target[prop];
        })
}