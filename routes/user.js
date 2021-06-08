const express=require('express')
const router=express.Router()
const User = require('../models/user')

const {requireSignin} = require('../controllers/auth')
const {userById,deleteUser}=require('../controllers/user')


router.get("/secret/:userId",requireSignin,(req,res)=>{
    res.json({
        user: req.profile
    })
})
router.delete("/delete/:id",deleteUser);
router.param('userId',userById)
router.param('id',deleteUser)
module.exports=router;