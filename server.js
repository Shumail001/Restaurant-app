const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()
require("dotenv").config()
const db = require("./config/db")
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoute")

// Middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


app.use("/api/v1/auth", userRoutes)




app.listen(PORT, () => console.log(`Server is Listen on Port ${PORT}`))