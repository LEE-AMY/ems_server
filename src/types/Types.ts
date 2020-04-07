import { EStatus } from "."

/**
 * CORS 参数类型约束
 */
export type TCorsParams = {
    origin?: string,
    headers?: string,
    methods?: string
}

/**
 * 图片数组存放格式
 */
export type TImgObj = {
    url: string,
    status: EStatus
    date: number
}