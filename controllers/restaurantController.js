const Restaurant = require("../models/restaurantModel")


const createRestaurant = async (req,res) => {
    try{
        const {title, imageUrl, foods, pickup,delivery, isOpen, rating,ratingCount,coords} = req.body
        if(!title || !coords){
            return res.status(500).send({
                success: false,
                message: "Please provide at least titile and coords",
            });
        }
        const restaurant = new Restaurant({
            title,
            imageUrl,
            foods,
            pickup,
            delivery,
            isOpen,
            rating,
            ratingCount,
            coords

        })
        if(!restaurant){
            return res.status(500).send({
                success: false,
                message: "Failed to create Restaurant object",
            });
        }
        await restaurant.save();
        return res.status(201).send({
            success: true,
            message: "Restaurant Created Successfully",
            restaurant
        })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Failed to Create Restaurant Api",
            err
        })
    }
}

const getAllRestaurant = async(req,res) => {
    try{
        const allRestaurant = await Restaurant.find({})
        if(!allRestaurant){
            return res.status(404).send({
                success: false,
                message: "Failed to Get the List of All Restaurant",
                
            })
        }
        return res.status(200).send({
            success: true,
            message: "Get All user Successfully",
            allRestaurant,
        })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Failed to Get the List of All Restaurant",
            err
        })
    }
}

const getRestaurant = async(req,res) => {
    try{
        const id = req.params.id;
    if(!id){
        return res.status(404).send({
            success: false,
            message: "Not provide id",
            
        })
    }
    const restaurant = await Restaurant.findById(id)
    if(!restaurant){
        return res.status(404).send({
            success: false,
            message: "Not found Restaurant wit this id",
            
        })
    }
    return res.status(200).send({
        success: true,
        message: "Get Restaurant Successfully",
        restaurant
    })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Failed to Get the List of All Restaurant",
            err
        })
    }
}

const deleteRestaurant = async(req,res) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(404).send({
                success: false,
                message: "Not provide id",
                
            })
        }
        const restaurant = await Restaurant.findByIdAndDelete(id)
        if(!restaurant){
            return res.status(404).send({
                success: false,
                message: "Failed to Delete Restaurant with this id",
                
            })
        }
        return res.status(200).send({
            success: true,
            message: "User Deleted Successfully",
            
        })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Failed to Delete the User",
            err
        })
    }
}

module.exports = {
    createRestaurant,
    getAllRestaurant,
    getRestaurant,
    deleteRestaurant,
}