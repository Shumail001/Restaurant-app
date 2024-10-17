const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

const restaurantSchema = new mongoose.Schema({
   title:{
    type: String,
    required: [true, "Title is Required"]
   },
   imageUrl:{
    type: String,
   },
   foods:{
    type: Array,
   },
   pickup:{
    type: Boolean,
    default: true,
   },
   delivery:{
    type: Boolean,
    default: true,
   },
   isOpen:{
    type: Boolean,
    default: true,
   },
   rating:{
    type: Number,
    default:3,
    min:1,
    max:5,
   },
   ratingCount:{
    type:String,
   },
   code:{
    type:String,
   },
   coords:{
    id:{type:String},
    latitude:{type:Number},
    latitudeDelta:{type:Number},
    longitude:{type:Number},
    longitudeDelta:{type:Number},
    address:{type:String},
    title:{type:String}
   }
},
{timestamps: true},
)





const Restaurant = mongoose.model("Restaurant",restaurantSchema)
module.exports = Restaurant