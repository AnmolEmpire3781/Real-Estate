const express = require('express');
const dotenv = require('dotenv');
const User = require("./models/user.model")
const userRouter = require("./routes/user.route")
const authRouter = require("./routes/auth.route")
const listingRouter = require('./routes/listing.route')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path  = require('path');
const exp = require('constants');

// configure .env
dotenv.config();

const dirname = path.resolve();


const app = express();
app.use(express.json());
app.use(cookieParser());

// defining routes
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use('/api/listing',listingRouter);

app.use(express.static(path.join(dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(dirname,'client', 'dist', 'index.html'))
})

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log("db not connecte");
});

// error handling middleware , global catches
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error';
    return res.status(statusCode).json({
        message,
        success:false,
        statusCode
    });
})


app.listen(3000,()=>{
    console.log("app active on port 3000");
})
