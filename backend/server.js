import express from 'express'
import authRoutes from './routes/auth.js'
import connecttomdbserver from './db/connect.js'
import { configDotenv } from 'dotenv'

const app = express()

configDotenv()
app.use(express.json())
app.use('/api/auth',authRoutes)
// app.get('/',(req,res)=>
// {
//     res.send("Server Is In Home Page")
// })
app.listen(3000,()=>
{
    connecttomdbserver()
    console.log("Server is listening");
})