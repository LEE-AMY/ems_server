import { Type, plainToClass } from "class-transformer"
import { validate, Length } from "class-validator"
import { BaseEntity } from "../BaseEntity"

export class Student extends BaseEntity {

    @Length(5, 10)
    @Type(() => String)
    stuNo: string

    @Length(1, 10)
    @Type(() => String)
    infNo: string

    @Length(5, 10)
    @Type(() => String)
    clsNo: string

    public static transform(plainObj: object) {
        return super.baseTransform(this, plainObj)
    }
}


// const obj = {
//     infNo: 100,
//     pwd: 123456,
//     stuNo: 101,
//     name: "张3",
//     title: "123456765",
//     sex: 1,
//     idNo: 1234567890,
//     joinDate: new Date().getTime()
// }

// const stu = plainToClass(Student, obj)

// console.log(stu)

// console.log("===")

// validate(stu).then(res => {
//     console.log(res)
// })

// export const b = 123;