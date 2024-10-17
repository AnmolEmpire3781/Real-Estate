const errorHandler = require("../utils/error");
const User = require('../models/user.model');
const Listing = require('../models/listing.model')
const bcryptjs = require('bcryptjs');
const test = (req,res)=>{
    res.json({
        msg:"hello world!!!"
    }).status(200)
};

const updateUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,"You can update only your own account !!"))

    try{
        if(req.body.password){
            req.body.password= bcryptjs.hashSync(req.body.password,10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set : {
                password : req.body.password,
                username : req.body.username,
                avatar : req.body.avatar,
                email : req.body.email
            }
        } , {new:true})

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    }
    catch(err){
        next(err);
    }
}

const deleteUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id) 
    return next(errorHandler(401,'You can only delete your own account'));

    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('user has been deleted !');
    }
    catch(err){
        next(err);
    }
}
const getUserListings = async (req,res,next)=>{
    
    if(req.user.id === req.params.id){
        try{
            const listings = await Listing.find({userRef : req.params.id})
            res.status(200).json(listings);
        }
        catch(error){
            next(error);
        }
    }
    else{
        return next(errorHandler(401,'You can only view your own listings'))
    }
    
}

const getUser = async (req,res,next)=>{
    
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return next(errorHandler(404,'user not found'));
        }
        const {password: pass, ...rest} = user._doc;
        return res.status(200).json(rest);

    }
    catch(err){
        next(err);
    }
}
module.exports = {test,updateUser , deleteUser, getUserListings,getUser};