const User=require('../models/user')
exports.signup=(req,res,next)=>{
    const user=new User(req.body)
    user.save((err,user)=>{
        if (err) {
            return res.status(400).json({message:err})
        }
        return res.status(200).json({
            Success:user
        })
    })

    
}