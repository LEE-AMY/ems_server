import mongoose from "mongoose"

export interface IPub<T, G> {
     add(plainObj: T): Promise<string[] | G>
}