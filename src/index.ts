import "reflect-metadata"
import Express, { Response } from "express"
import morgan from "morgan"
import { createStream } from "rotating-file-stream"
import path from "path"
import cookieParser from "cookie-parser"
import apiRout from "./routes"
import expressJWT from "express-jwt"
import { secretOrPrivateKey } from "./types"
import { verifyToken } from "./utils"

const port = 9527
const app = Express()
const accessLogStream = createStream("access.log", {
    interval: "1d",
    path: path.join(__dirname, "../log")
})

// app.all("*", (req, res, next) => {
//     // console.log(req, res, next)
//     // req.baseUrl
//     // console.log
//     console.log(req.headers['x-access-token'])
//     console.log(req.url)
//     next()
// })

app.use(expressJWT({
    secret: secretOrPrivateKey,
    credentialsRequired: false,
    getToken: (req) => {
        console.log('234567890-')
        console.log(req.headers['x-access-token'])
        if (req.headers['x-access-token']) {
            return req.headers['x-access-token']
        } else if (req.query.token) {
            return req.query.token
        }
        return null
    }
}).unless({
    path: ["/api/v1/user/login"]
}))

app.use((req, res, next) => {
    // const token = req.headers["x-access-token"]
    // // if(token)
    // console.log(token)
    // verifyToken(token as string)
    // next()
    // tslint:disable-next-line:no-string-literal
    const r = req['user']
    console.log("req=>", r)
    if (r) {
        next()
    } else {
        res.send("没有登陆")
    }
    // console.log("req=>", req['user'])
    // next()
})

app.use((err, req, res, next) => {
    console.log(err)
    res.send("error")
})

app.use(morgan("combined", { stream: accessLogStream }))
app.use(cookieParser())
app.use(Express.json())

app.use("/api", apiRout)
app.use("/upload", Express.static("public/upload"))
app.get("/", (req, res) => { res.send("I already remember you") })

app.listen(port, () => {
    console.log("==> ems system server running <==", `port: ${port}`)
})