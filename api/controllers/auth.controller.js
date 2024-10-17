const User = require("../models/user.model")
const errorHandler = require("../utils/error")
const jwt = require('jsonwebtoken')
// we need to encrypt the password to store it in db
// we will use bcryptjs package
const bcryptjs = require('bcryptjs');

const signup =async (req,res,next)=>{
    const {username, email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    try{
        await User.create({username,email,password:hashedPassword})
        res.json({
            msg:"user created successfully"
        }).status(201);
    }catch(err){
        // next(errorHandler(550,'user not created'));
        next(err);
    }
 }

const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    try{
        // step 1 check if user with given email is in our db or not
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHandler(404,'User not found'))
        }
        // step 2 check if password matches or not
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(401,'Wrong credentials'));
        }

        // jwt and token
        const token = jwt.sign({id:validUser._id,email},process.env.JWT_SECRET)

        const {password:pass , ...rest} = validUser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    }catch(err){
        next(err);
    }
}

const google = async (req,res,next)=>{
    const {email,name,photo} = req.body;
    try{
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
            const {password : pass, ...rest} = user._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8); 
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            await User.create({
                username : name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email,
                password : hashedPassword,
                avatar : photo
            });
            const createdUser = await User.findOne({email});
            const token = jwt.sign({id: createdUser._id},process.env.JWT_SECRET)
            const {password : pass,...res} = createdUser._doc;
            res.cookie("access_token",token,{httpOnly:true}).status(200).json(res);
        }
    }
    catch(err){
        next(err)
    }
}

const signOut = async (req,res,next)=>{
    try{
        res.clearCookie('access_token');
        res.status(200).json('user has been logged out !');
    }
    catch(err){
        next(err)
    }
}
module.exports = {signup,signin,google, signOut};