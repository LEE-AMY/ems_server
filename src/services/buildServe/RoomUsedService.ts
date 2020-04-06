import { RoomUsed, SearchCondition } from "../../entities"
import { RoomUsedModel, IRoomUsed } from "../../db"
import { ISearchResult } from "../../types"

export class RoomUsedService {
    public static async add(roomUsed: RoomUsed) {
        roomUsed = RoomUsed.transform(roomUsed)
        const errs = await roomUsed.validateThis()
        if (errs.length) { return errs }
        return await RoomUsedModel.create(roomUsed)
    }

    public static async findByIdAndDelete(id: string) {
        return await RoomUsedModel.findByIdAndDelete(id)
    }

    public static async edit(id: string, roomUsed: RoomUsed) {
        const newRoomUsed = RoomUsed.transform(roomUsed)
        const errs = await newRoomUsed.validateThis(true)
        if (errs.length) { return errs }
        return await RoomUsedModel.findByIdAndUpdate(id, roomUsed)

    }

    public static async findById(id: string) {
        return await RoomUsedModel.findById(id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<IRoomUsed>> {
        condition = SearchCondition.transform(condition)
        const errors = await condition.validateThis(true)
        if (errors.length) {
            return {
                count: 0,
                data: [],
                errors
            }
        }
        const { key, page, limit, keyType } = condition
        const con: any = {}
        if (key) {
            if (!keyType) {
                con.buildID = key
            } else if (keyType === "roomID") {
                con.roomID = key
            }
            else {
                con.useType = { $regex: new RegExp(key) }
            }
        }

        const roomUsed = await RoomUsedModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await RoomUsedModel.find(con)
            .countDocuments()

        return {
            errors,
            data: roomUsed,
            count
        }
    }
}