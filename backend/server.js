import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import verify from './routes/verification.js'
import InstituteLogin from './routes/InstituteLogin.js'
import pincodeRoutes from "./routes/pincode.js";
import playerRoute from './routes/playerRoute.js'
import academyRoute from './routes/academy.js'
import reportRoute from './routes/reportRoute.js'
import mailRoute from './routes/mailRoute.js'

dotenv.config()



const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/institute', InstituteLogin)
app.use('/api/verify', verify)
app.use("/api", pincodeRoutes);
app.use('/api/player', playerRoute)
app.use('/api/academy', academyRoute)
app.use('/api/reports',reportRoute)
app.use('/api/mail',mailRoute)



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database conncted'))
.catch((err) => console.error(err))

app.listen(process.env.PORT , () => {
    console.log('server is running')
})