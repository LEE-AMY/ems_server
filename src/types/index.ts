
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
 * 性别枚举
 */
export enum EGender {
    male,
    female
}


export type corsParams = {
    origin?: string,
    headers?: string,
    methods?: string
}

export enum EDBName {
    Admin = "admin",
    Stu = "student",
    Tch = "teacher"
}