import { EStatus, EDBName, ECRSStatus, EGender } from "./Enum";

/**
 * 普通状态数组
 */
const status: EStatus[] = [EStatus.unActive, EStatus.active, EStatus.logout, EStatus.locked]

/**
 * 普通状态对应中文
 */
const statusCN = [{
    status: EStatus.unActive,
    CN: "未激活"
}, {
    status: EStatus.active,
    CN: "激活"
}, {
    status: EStatus.logout,
    CN: "注销"
}, {
    status: EStatus.locked,
    CN: "锁定"
}]

/**
 * 课程状态数组
 */
const crsStatus: ECRSStatus[] = [ECRSStatus.unActive, ECRSStatus.optional, ECRSStatus.unOptional, ECRSStatus.full]

/**
 * CORS 参数类型约束
 */
type TCorsParams = {
    origin?: string,
    headers?: string,
    methods?: string
}

/**
 * 用户角色类型
 */
const role = [
    { enName: EDBName.Stu, cnName: "学生" },
    { enName: EDBName.Tch, cnName: "教师" },
    { enName: EDBName.Admin, cnName: "管理员" }
]

const pwdType = "******"

export {
    EStatus,
    ECRSStatus,
    EGender,
    EDBName,
    TCorsParams,
    status,
    statusCN,
    crsStatus,
    role,
    pwdType
}