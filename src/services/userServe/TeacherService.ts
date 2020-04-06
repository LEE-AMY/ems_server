import { Teacher } from "../../entities"
import { TeacherModel } from "../../db"
import { pwdType } from "../../types"
import { getHash } from "../../utils"

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
        const nTch = Teacher.transform(tch);
        const errs = await nTch.validateThis();
        if (errs.length) { return errs }

        const newTch = {
            ...tch,
            tchNo: this.tchNo,
            _index: this.index,
            pwd: await getHash(tch.pwd)
        }

        const result = await TeacherModel.create(newTch);
        result.pwd = pwdType;
        return result;
    }

    public static async edit(tchNo: string, tch: Teacher) {
        const newTch = Teacher.transform(tch);
        const errs = await newTch.validateThis(true);
        if (errs.length) { return errs }

        const { _index, tchNo: _, ...updateTch } = tch

        return TeacherModel.findOneAndUpdate({ tchNo }, updateTch);
    }

    public static async findByIdAndDelete(tchNo: string) {
        return await TeacherModel.findByIdAndDelete({ tchNo })
    }

    public static async findByAccount(tchNo: string) {
        return await TeacherModel.findOne({ tchNo })
    }
}


function getTchIndex(target: any, prop: string) {
    const year = target.year = new Date().getFullYear()
    TeacherModel.find({ tchNo: { $regex: new RegExp(`^(T${year})`) } })
        .sort({ _index: -1 })
        .limit(1)
        .exec((err, maxResult) => {
            if (err) {
                return err
            }
            target[prop] = maxResult && maxResult[0] && maxResult[0]._index || target[prop];
        })
}