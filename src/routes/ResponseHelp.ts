import { Response } from "express"
import { ISearchResult } from "../types"


export class ResponseHelp {

    public static sendError(error: string | string[], res: Response) {
        const err: string = Array.isArray(error) ? error.join(";") : error
        res.send({
            err,
            data: null
        })
    }

    public static sendData(data: any, res: Response) {
        res.send({
            err: null,
            data
        })
    }

    public static sendPageData<T>(data: ISearchResult<T>, res: Response) {
        if (data.errors.length) {
            this.sendError(data.errors, res)
            return
        }
        res.send({
            err: null,
            data: data.data,
            total: data.count
        })
    }
}