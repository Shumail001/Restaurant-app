const mongoose = require("mongoose")

const MongoUri = process.env.MONGO_URL

mongoose.connect(MongoUri)

const db = mongoose.connection

db.on("connected", () => {
    console.log("MongoDB is Connected!");
})

db.on("error", () => {
    console.log("MongoDB Connection Error!")
})

db.on("disconnected", () => {
    console.log("Disconnect MongoDB!")
})


module.exports = db