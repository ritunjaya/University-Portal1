const jwt = require('jsonwebtoken')
const usermodal =require('../models/user')


const checkuserauth = async(req,res,next)=>{
   // console.log('hello auth')
   const {token} = req.cookies
   //console.log(token)
   if (!token){
    req.flash('error', 'Unauthorized user')
    res.redirect('/')
    
   }
   else{
    const verify =jwt.verify ( token,'jungkookie@123#45678')
    //console.log(verify)

    const user= await usermodal.findById(verify.ID)
   //console.log(user)
   req.user = user
    next()
   }
}
module.exports = checkuserauth