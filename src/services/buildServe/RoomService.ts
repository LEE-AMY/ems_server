import { Room, SearchCondition } from "../../entities"
import { RoomModel, IRoom } from "../../db"
import { ISearchResult } from "../../types"

export class RoomService {
    public static async add(room: Room) {
        room = Room.transform(room)
        const errs = await room.validateThis()
        if (errs.length) { return errs }
        return await RoomModel.create(room)
    }

    public static async findByIdAndDelete(id: string) {
        return await RoomModel.findByIdAndDelete(id)
    }

    public static async edit(id: string, room: Room) {
        const newRoom = Room.transform(room)
        const errs = await newRoom.validateThis(true)
        if (errs.length) { return errs }
        return await RoomModel.findByIdAndUpdate(id, room)
    }

    public static async findById(id: string) {
        return await RoomModel.findById(id)
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<IRoom>> {
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
            } else {
                con.roomType = { $regex: new RegExp(key) }
            }
        }

        const room = await RoomModel.find(con)
            .skip((page - 1) * limit)
            .limit(limit)
        const count = await RoomModel.find(con)
            .countDocuments()

        return {
            errors,
            data: room,
            count
        }
    }
}