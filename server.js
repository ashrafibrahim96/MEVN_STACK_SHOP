const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const userRoutes=require('./routes/user')
const morgan=require('morgan')
const cookieParser=require('cookie-parser')
const dotenv=require('dotenv')
dotenv.config()
const app=express()
app.use(bodyParser.json())

//db connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("Database Connected !")
})
.catch((err)=>{console.log("Erreeur",err)})

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
//routes middleware
app.use("/api",userRoutes);


const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`Server running on ${PORT}`))