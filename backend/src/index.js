import express from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import cors from "cors"

import { connectDB } from './lib/db.js'
import authRouths from "./routes/auth.route.js"
import messageRouths from "./routes/message.route.js"
import { app, server } from "./lib/socket.js"

dotenv.config()

const PORT = process.env.PORT

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRouths)
app.use("/api/messages", messageRouths)


server.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`);
    connectDB()
})