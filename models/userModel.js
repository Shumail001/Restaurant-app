const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: [true, "User Name is Required"],
    },
    email:{
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    address:{
        type: Array,
        default: ["Pakistan Lahore"]
    },
    phone:{
        type: String,
        required: [true, "Phone Number is Required"]
    },
    userType:{
        type: String,
        required: [true, "user type is Required"],
        default: 'client',
        enum: ['admin','client','vendor','driver']
    },
    profileImage:{
        type: String,
        default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
    }
},
{timestamps: true},
)


userSchema.pre('save', async function (next) {
    const user = this;
  
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };


const User = mongoose.model("User",userSchema)

module.exports = User