const express = require("express")
const { RegisterUser,loginUser,getUser,updateUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const userRoute = express.Router();



userRoute.post("/signup",RegisterUser)
userRoute.post("/login",loginUser)
userRoute.get("/user", authMiddleware,getUser)
userRoute.put("/update",authMiddleware,updateUser)
userRoute.delete("/delete",authMiddleware,deleteUser)



module.exports = userRoute

