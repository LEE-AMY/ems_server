
/**
 * 普通状态枚举
 */
export enum EStatus {
    unActive = 0,
    active,
    logout,
    locked
}

/**
 * 普通状态数组
 */
export const status: EStatus[] = [EStatus.unActive, EStatus.active, EStatus.logout, EStatus.logout]

/**
 * 课程可选状态
 */
export enum ECRSStatus {
    unActive = 0,
    optional,
    unOptional,
    full
}

export const SRCStatus: ECRSStatus[] = [ECRSStatus.unActive, ECRSStatus.optional, ECRSStatus.unOptional, ECRSStatus.full]

/**
 * 性别枚举
 */
export enum EGender {
    male,
    female
}

/**
 * CORS 参数类型约束
 */
export type corsParams = {
    origin?: string,
    headers?: string,
    methods?: string
}

/**
 * 数据库名字枚举
 */
export enum EDBName {
    Admin = "admin",
    Stu = "student",
    Tch = "teacher"
}

/**
 * 用户角色类型
 */
export const role = [
    { enName: EDBName.Stu, cnName: "学生" },
    { enName: EDBName.Tch, cnName: "教师" },
    { enName: EDBName.Admin, cnName: "管理员" }
]