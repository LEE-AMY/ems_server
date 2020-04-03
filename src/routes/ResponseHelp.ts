import { Response, Request } from "express";
import { TCorsParams } from "../types";

const defCors: TCorsParams = {
    origin: "*",
    headers: "Content-Type, Content-Length, Authorization, Accept, X-Requested-With",
    methods: "PUT, POST, GET, DELETE, OPTIONS"
}

export class ResponseHelp {

    private static pubResHead(req: Request, res: Response) {
        const nCors = {
            ...defCors,
            origin: `${req.protocol}://${req.headers.host}`,
            methods: req.method
        }
        res.header("Access-Control-Allow-Origin", nCors.origin)
        res.header("Access-Control-Allow-Headers", nCors.headers)
        res.header("Access-Control-Allow-Methods", nCors.methods)
    }

    public static sendError(error: string | string[], req: Request, res: Response) {
        this.pubResHead(req, res)
        const err: string = Array.isArray(error) ? error.join(";") : error
        res.send({
            err,
            data: null
        })
    }

    public static sendData(data: any, req: Request, res: Response) {
        this.pubResHead(req, res)

        res.send({
            err: null,
            data
        })
    }
}