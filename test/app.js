const express = require('express');

// mongoose 
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://pandeydivyansh1803:yashpandey162@realestate.wnuswem.mongodb.net/dp1803").then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log("db not connecte");
});

// create a schema , the first parameter of mongoose.model is table name
// and second is schema
const User = mongoose.model("Users",{
    email: String,
    password: String,
    name : String
});


const app = express();



app.get("/",(req,res)=>{
    res.json({
        msg:"hello world"
    }).status(200);
})
app.listen(5000,()=>{
    console.log("app active on port 5000");
})
