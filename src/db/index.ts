import mongoose from 'mongoose';
import AdminModel from "./AdminSchema"

const dbURL = "mongodb://127.0.0.1:27017/emsDB";

mongoose.connect(dbURL, {

}).then(() => {
    console.log("connect mongodb success");
}).catch((e) => {
    console.log(`connect mongodb failed ${e}`);
})

export {
    AdminModel
}