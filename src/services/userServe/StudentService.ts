import { Student, SearchCondition } from "../../entities"
import { StudentModel, IStudent } from "../../db"
import { pwdType, ISearchResult } from "../../types"
import { getHash } from "../../utils"
import { DepartmentService, ClassService, UserBaseService } from "../"



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

    public static async add(stu: Student) {
        stu = Student.transform(stu)
        const errs = await stu.validateThis()
        errs.push(...await this.checkClassIDAndDeptIdAndInfID(stu))
        if (errs.length) {
            return errs
        }

        const newStu = {
            ...stu,
            stuNo: this.stuNo,
            _index: this.index,
            pwd: await getHash(stu.pwd)
        }

        const result = await StudentModel.create(newStu)
        result.pwd = pwdType
        return result
    }

    public static async edit(stuNo: string, stu: Student) {
        const newStu = Student.transform(stu)
        const errs = await newStu.validateThis(true)
        errs.push(...await this.checkClassIDAndDeptIdAndInfID(stu))
        if (errs.length) {
            return errs
        }

        const { stuNo: _, _index, ...updateStu } = stu

        if (updateStu.pwd) {
            updateStu.pwd = await getHash(updateStu.pwd)
        }

        return await StudentModel.findOneAndUpdate({ stuNo }, updateStu)
    }

    public static async findOneAndDelete(stuNo: string) {
        return await StudentModel.findOneAndDelete({ stuNo })
    }

    public static async findByAccount(stuNo: string) {
        return await StudentModel.findOne({ stuNo })
    }

    private static async checkClassIDAndDeptIdAndInfID({ clsID, deptID, infID }: Student) {
        const errs: string[] = []
        if (clsID && !await ClassService.findById(clsID)) {
            errs.push(`班级ID:[${clsID}]不存在`)
        }

        if (deptID && !await DepartmentService.findById(deptID)) {
            errs.push(`学院ID:[${deptID}]不存在`)
        }

        if (infID && !await UserBaseService.findById(infID)) {
            errs.push(`基础信息ID:[${infID}]不存在`)
        }

        return errs
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<IStudent>> {
        condition = SearchCondition.transform(condition)
        const errors = await condition.validateThis(true)
        if (errors.length) {
            return { errors, count: 0, data: [] }
        }

        const { key, page, limit, keyType } = condition
        const students = await StudentModel.find({ stuNo: { $regex: new RegExp(key) } })
            .skip((page - 1) * limit)
            .limit(limit)

        const count = await StudentModel.find({ stuNo: { $regex: new RegExp(key) } })
            .countDocuments()

        // 屏蔽密码
        students.forEach(item => item.pwd = pwdType)

        return {
            errors: [],
            count,
            data: students
        }
    }
}

/**
 * 获取学生索引值的装饰器
 * @param target
 * @param prop
 */
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


