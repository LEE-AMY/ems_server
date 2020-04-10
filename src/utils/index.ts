import bcrypt from "bcrypt"
import fs from "fs"
import jwt from "jsonwebtoken"
import { secretOrPrivateKey } from "../types"

/**
 * 下划线转换驼峰
 * @param str 下划线字符串
 */
export const toHump = (str: string) => str.replace(/\_(\w)/g, (_, letter) => letter.toUpperCase())

/**
 * 驼峰转换下划线
 * @param str  驼峰字符串
 */
export const toLine = (str: string) => str.replace(/([A-Z])/g, "_$1").toLowerCase()

/**
 * 获取hash值
 * @param pwd
 * @param saltRounds
 */
export async function getHash(pwd: string, saltRounds: number = 10): Promise<string> {
    return await bcrypt.hash(pwd, saltRounds)
}

/**
 * hash值对比
 * @param pwd
 * @param hash
 */
export async function hashCompare(pwd: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(pwd, hash)
}

/**
 * 简单拷贝
 * @param obj
 */
export function cloneObj(obj: any): any {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * 删除文件
 * @param path 文件全路径
 */
export function deleteFile(path) {
    fs.unlink(path, err => {
        if (err) {
            console.log(`删除${path}失败`)
            return
        }
        console.log(`删除${path}成功`)
    })
}

/**
 * 获取token
 * @param id
 * @param username
 */
export function getToken(id: string, username: string) {
    return jwt.sign({
        username,
        id
    }, secretOrPrivateKey, {
        // algorithm: "RS256",
        expiresIn: 60 * 60 * 24
    })
}

export function verifyToken(token: string) {
    const result = jwt.verify(token, secretOrPrivateKey)
    console.log(result)
    return result
}