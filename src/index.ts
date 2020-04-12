import "reflect-metadata"
import Express from "express"
import morgan from "morgan"
import { createStream } from "rotating-file-stream"
import path from "path"
import cookieParser from "cookie-parser"
import apiRout from "./routes"
import expressJWT from "express-jwt"
import { secretOrPrivateKey } from "./types"

const port = 9527
const app = Express()
const accessLogStream = createStream("access.log", {
    interval: "1d",
    path: path.join(__dirname, "../log")
})

/**
 * 验证token
 */
app.use(expressJWT({
    secret: secretOrPrivateKey,
    credentialsRequired: true,
    requestProperty: "ems",
    getToken: (req) => {
        if (req.headers['x-access-token']) {
            return req.headers['x-access-token']
        } else if (req.query.token) {
            return req.query.token
        }
        return null
    }
}).unless({
    path: ["/api/v1/user/login/admin"]
}))

/**
 * 验证token 判断通不过的在此处理
 */
app.use((err, req, res, next) => {
    console.log(err)
    res.status(401).send("invalid token...")
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