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
 * 课程可选状态
 */
export enum ECrsStatus {
    unActive = 0,
    optional,
    unOptional,
    full
}

/**
 * 性别枚举
 */
export enum EGender {
    male,
    female
}

/**
 * 角色类型枚举
 */
export enum EDBName {
    Admin = "admin",
    Stu = "student",
    Tch = "teacher"
}