import express from "express"
import dotenv from "dotenv"
import { connectDB } from './lib/db.js'
import authRouths from "./routes/auth.route.js"

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json())

app.use("/api/auth", authRouths)


app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`);
    connectDB()
})