const User=require('../models/user')
const jwt=require('jsonwebtoken') //generate token
const expressJwt=require('express-jwt') //auth check
const {errorHandler}= require('../helpers/dbErrorHandler')
// const user = require('../models/user')
exports.signup=(req,res)=>{
    const user=new User(req.body)
    user.save((err,user)=>{
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt=undefined
        user.hashed_password=undefined
        return res.status(200).json({
            Success:user
        })
    })
}
exports.signin=(req,res) =>{
    const {email,password}=req.body
    User.findOne({email},(err,user)=>{
        if (err || !user){
            return res.status(400).json({Error: "User doesn't exist. Please Signup"})
        }
        // check if email + password matches

        //authenticate in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                Error: "Email and password don't match"
            })
        }

        //generate signed token with user id and secret
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)

        //persist token as 'token' in cookie and give expiry date
        res.cookie('token',token,{expire: new Date()+9999})
        //return response with user and token to frontend
        const {_id,name,email,role}=user
        return res.json({token,user:{_id,name,email,role}})
    })
}
exports.signout = (req,res)=>{
    res.clearCookie('token');
    res.json({messaege:"Singed out."})
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});


