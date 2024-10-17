const express = require("express")
const {createRestaurant, getAllRestaurant, getRestaurant, deleteRestaurant} = require("../controllers/restaurantController")
const authMiddleware = require("../middlewares/authMiddleware");

const restaurantRoute = express.Router();


restaurantRoute.post("/restaurant",authMiddleware,createRestaurant)
restaurantRoute.get("/restaurant",authMiddleware,getAllRestaurant)
restaurantRoute.get("/restaurant/:id",getRestaurant)
restaurantRoute.delete("/restaurant/:id",authMiddleware,deleteRestaurant)


module.exports = restaurantRoute