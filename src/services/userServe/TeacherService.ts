import { Teacher, SearchCondition } from "../../entities"
import { TeacherModel, ITeacher } from "../../db"
import { pwdType, ISearchResult } from "../../types"
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

        if (tch.pwd) {
            tch.pwd = await getHash(tch.pwd)
        }

        const result = await TeacherModel.findOneAndUpdate({ tchNo }, tch);
        if (result) {
            result.pwd = pwdType
        }

        return result
    }

    public static async findOneAndDelete(tchNo: string) {
        return await TeacherModel.findOneAndDelete({ tchNo })
    }

    public static async findByAccount(tchNo: string) {
        const result = await TeacherModel.findOne({ tchNo })
        if (result) {
            result.pwd = pwdType
        }
        return result
    }

    public static async loginFind(tchNo: string) {
        return await TeacherModel.findOne({ tchNo })
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<ITeacher>> {
        condition = SearchCondition.transform(condition)
        const errors = await condition.validateThis(true)
        if (errors.length) {
            return { errors, count: 0, data: [] }
        }

        const { key, page, limit, keyType } = condition
        const teachers = await TeacherModel.find({ tchNo: { $regex: new RegExp(key) } })
            .skip((page - 1) * limit)
            .limit(limit)

        const count = await TeacherModel.find({ tchNo: { $regex: new RegExp(key) } })
            .countDocuments()

        // 屏蔽密码
        teachers.forEach(item => item.pwd = pwdType)

        return {
            errors: [],
            count,
            data: teachers
        }
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