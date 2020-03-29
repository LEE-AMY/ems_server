import "reflect-metadata"
import Express from "express";
import apiRout from "./routes"

const port = 9527;
const app = Express();

app.use(Express.json())

app.get("/", (req, res) => {
    res.send("hello word")
})

app.use("/api", apiRout)

app.listen(port, () => {
    console.log("==> ems system server running <==", `port: ${port}`)
})
