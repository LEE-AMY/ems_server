import { Student } from "../entities";
import { StudentModel } from "../db";
import { IStudent } from "../db/StudentSchema";
import { pwdType } from "../types";


export class StudentService {

    @getStuIndex
    private static index: number = 0
    private static year: number = 0
    private static len: number = 5

    /**
     * 生成学号
     */
    private static get stuNo(): string {
        const ny = new Date().getFullYear()
        if (ny !== this.year) {
            this.index = 0
            this.year = ny
        }
        this.index += 1
        return `${this.year}${(this.index).toString().padStart(this.len, "0")}`;
    }

    public static async add(stu: Student): Promise<string[] | IStudent> {
        stu = Student.transform(stu)
        const errs = await stu.validateThis()
        if (errs.length) {
            return errs
        }

        stu.stuNo = this.stuNo
        stu._index = this.index

        const result = await StudentModel.create(stu)
        result.pwd = pwdType
        return result
    }

    public static async edit(_id: string, stu: Student) {
        const newStu = Student.transform(stu)
        const errs = await newStu.validateThis(true)

        if (errs.length) {
            return errs
        }

        const { stuNo, _index, ...updateStu } = stu

        await StudentModel.updateOne({ _id }, updateStu)
        return errs
    }

    public static async findById(id: string) {
        const result =  await StudentModel.findById(id)

        if(result){
            result.pwd = pwdType
        }

        return result
    }

    public static async deleteById(_id: string) {
        await StudentModel.deleteOne({ _id })
    }

    public static async loginValidate(stuNo: string, pwd: string) {
        const result = await StudentModel.findOne({ stuNo, pwd })
        if (result) result.pwd = pwdType
        return result
    }
}


function getStuIndex(target: any, prop: string) {

    const year = target.year = new Date().getFullYear()

    StudentModel.find({ stuNo: { $regex: new RegExp(`^(${year})`) } })
        .sort({ _index: -1 })
        .limit(1)
        .exec((err, maxResult) => {
            if (err) {
                return err;
            }
            target[prop] = maxResult && maxResult[0] && maxResult[0]._index || target[prop];
        })
}


