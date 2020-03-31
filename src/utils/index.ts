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