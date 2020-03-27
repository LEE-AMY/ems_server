import "reflect-metadata"
import Express from "express";

// const t = new Teacher()
// console.log(t.infNo)

const port = 9527;
const app = Express();

app.get("/", (req, res) => {
    res.send("hello word")
})

app.listen(port, () => {
    console.log("==> ems system server running <==", `port: ${port}`)
})
