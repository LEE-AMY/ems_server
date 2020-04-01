import "reflect-metadata"
import { add } from "./studentService.test"

// add()
// add()

let num1 = 10
let num2 = 10
let num3 = 10

const timer1 = setInterval(()=>{
    if(num1<=0){
        clearInterval(timer1)
    }
    --num1;
    add()
}, 10000)

const timer2 = setInterval(()=>{
    if(num2<=0){
        clearInterval(timer2)
    }
    --num2;
    add()
}, 5000)

const timer3 = setInterval(()=>{
    if(num3<=0){
        clearInterval(timer3)
    }
    --num3;
    add()
}, 2000)