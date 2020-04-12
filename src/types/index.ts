import { EStatus, EDBName, ECrsStatus, EGender, EImgType } from "./Enum";
import { TCorsParams, TImgObj } from "./Types";
import { ISearchResult } from "./Interface"

/**
 * 普通状态对应中文
 */
export const statusCN = [
    { status: EStatus.unActive, CN: "未激活" },
    { status: EStatus.active, CN: "激活" },
    { status: EStatus.logout, CN: "注销" },
    { status: EStatus.locked, CN: "锁定" }
]

/**
 * 普通状态数组
 */
export const status: EStatus[] = statusCN.map(item => item.status)

/**
 * 普通状态对应中文
 */
export const crsStatusCN = [
    { status: ECrsStatus.unActive, CN: "未激活" },
    { status: ECrsStatus.optional, CN: "可选" },
    { status: ECrsStatus.unOptional, CN: "不可选" },
    { status: ECrsStatus.full, CN: "已满" }
]

/**
 * 课程状态数组
 */
export const crsStatus: ECrsStatus[] = crsStatusCN.map(item => item.status)

/**
 * 用户角色对应中文
 */
export const roleCN = [
    { enName: EDBName.Stu, cnName: "学生" },
    { enName: EDBName.Tch, cnName: "教师" },
    { enName: EDBName.Admin, cnName: "管理员" }
]

/**
 * 用户角色数组
 */
export const roleArr = roleCN.map(item => item.enName)

/**
 * 密码类型
 */
export const pwdType = "******"

/**
 * img类型数组
 */
export const imgTypeArr: EImgType[] = [EImgType.avatar, EImgType.life, EImgType.travel]

/**
 * 公钥
 */
export const secretOrPrivateKey = "^Educational@Management#System&"

export {
    EStatus,
    ECrsStatus,
    EGender,
    EDBName,
    EImgType,
    TCorsParams,
    TImgObj,
    ISearchResult
}