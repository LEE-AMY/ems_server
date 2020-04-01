import { Student } from "../entities";
import { StudentModel } from "../db";
import { IStudent } from "../db/StudentSchema";

export class StudentService {
    public static async add(stu: Student): Promise<string[] | IStudent> {
        stu = Student.transform(stu)

        const errs = await stu.validateThis()

        if (errs.length) {
            return errs
        }

        return await StudentModel.create(stu)
    }
}

