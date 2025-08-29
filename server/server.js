import express from 'express';
import 'dotenv/config';
import { connectDB } from './db/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    methods:['POST','PUT','GET','PATCH'],
    credentials:true
}))

app.use(cookieParser())

const PORT= process.env.PORT || 3000

app.get('/', (req,res)=>{
    res.json('HELLO')
})

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)



connectDB().then(()=>{ 
    app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
    

})
}).catch(err=> console.log(err)
)
