const express=require('express')
const router=express.Router()
const {userSignupValidator,isRequestValidated} =require('../validator/index')

const {signup, signin,signout, requireSignin, getAll} =require('../controllers/auth')

router.post('/signup',userSignupValidator,isRequestValidated,signup);
router.post('/signin',signin)
router.get('/signout',signout)
router.get('/getall',getAll)

module.exports=router;