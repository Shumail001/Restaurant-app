const mongoose = require("mongoose")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const RegisterUser = async (req, res) => {
    try{
        const {username,email,password,phone} = req.body;
        if(!username || !email || !password || !phone){
            return res.status(500).send({
                success: false,
                message: "Please provide all fields",
            });
        }
        const alreadyExist = await User.findOne({email: email})
        if (alreadyExist){
            return res.status(500).send({
                success: false,
                message: "User with this Email is Already Exist",
            });
        }
        
        const user = await User.create({
            userName: username,
            email: email,
            password: password,
            phone: phone,

        })

        return res.status(201).send({
            success: true,
            message: "User Create Successfully",
        })

    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Failed to Register User",
            err
        })
    }
}

const loginUser = async (req,res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(500).send({
                success: false,
                message: "Please provide both fields email and password",
            });
        }
        const user = await User.findOne({email: email})
        if(!user || !(await user.matchPassword(password))){
            return res.status(500).send({
                success: false,
                message: "Email or Password is Incorrect",
            });
        }
        const payload = {
            id: user.id,
            userName: user.userName,
        }
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "7d",
        })
        return res.status(200).send({
            success: true,
            message: "User Login Successfully",
            user: user,
            token
        })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Failed to Login User",
            err
        })
    }
}


const getUser = async (req,res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById({_id: userId})
        if(!user){
            return res.status(500).send({
                success: false,
                message: "User not Found",
            })
        }
        return res.status(200).send({
            success: true,
            message: "User Found Successfully",
            user,
        })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Error in Get User Api",
            err
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        const updatedUserData = req.body;
        if (!updatedUserData || Object.keys(updatedUserData).length === 0) {
            return res.status(400).send({
                success: false,
                message: "No data provided for update",
            });
        }

        const user = await User.findByIdAndUpdate(userId, updatedUserData, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User update failed. User not found.",
            });
        }

        return res.status(200).send({
            success: true,
            message: "User updated successfully",
            user,
        });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).send({
            success: false,
            message: "An error occurred while updating the user",
            error: err.message,
        });
    }
};



const deleteUser = async(req,res) =>{
    try{
        const userId = req.user.id;
        if(!userId){
            return res.status(500).send({
                success: false,
                message: "User not Found",
            });
        }
        const user = await User.findByIdAndDelete(userId)
        if(!user){
            return res.status(500).send({
                success: false,
                message: "Failed to delete the user",
            });
        }
        return res.status(200).send({
            success: true,
            message: "User deleted Successfully"
        })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Failed to delete the user",
            err
        })
    }
}

module.exports = {
    RegisterUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
}