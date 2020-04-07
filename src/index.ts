import "reflect-metadata"
import Express from "express"
import cookieParser from "cookie-parser"
import apiRout from "./routes"


const port = 9527;
const app = Express();
app.use("/upload", Express.static("public/upload"))

app.use(cookieParser())

app.use(Express.json())

app.get("/", (req, res) => {
    res.send("I already remember you")
})

app.use("/api", apiRout)

app.listen(port, () => {
    console.log("==> ems system server running <==", `port: ${port}`)
})
