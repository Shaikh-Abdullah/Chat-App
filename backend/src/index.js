import express from "express"

import authRouths from "./routes/auth.route.js"

const app = express()

app.use("/api/auth", authRouths)


app.listen(5001, () => {
    console.log("Server in running on port 5001");
})