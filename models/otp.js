const mongoose=require('mongoose');

//define schema
const otpSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        reqiured:true,
    },
    code:{
        type:String,
        required:true,
    },
   expireIn:{
    type:Number
   }
},{timesstamps:true})


//create collection
let otp =conn.model('otp',otpSchema,'otp')