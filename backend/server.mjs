import express from 'express'
import authRoutes from './routes/auth.mjs'

const app = express()


app.use('/api/auth',authRoutes)

app.get('/',(req,res)=>
{
    res.send("Server Is In Home Page")
})


app.listen(3000,()=>
{
    console.log("Server is listening");
})