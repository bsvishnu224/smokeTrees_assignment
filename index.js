const mongoose=require("mongoose")
const express=require("express")
const bodyParser=require("body-parser")
const dotEnv=require("dotenv")

const userRouter=require('./router/userRouter')



const app=express()
app.use(bodyParser.json())

const path=2222;

dotEnv.config()
app.use('/user',userRouter)

mongoose.connect(process.env.mongo_URI)
.then(()=>console.log("MongooDb connected successfully"))
.catch((error)=>console.log(error))


app.listen(path,()=>{
    console.log("Server Started")
})


