const mongoose=require('mongoose');

//define schema
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        reqiured:true,
    },
    number:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    image:
    {
        public_id:{
            type:String,
        },
        url:{
            type:String,
        }
        
    },
    role:{
        type :String,
        default:'student'
    }
},{timesstamps:true})


//create collection
const UserModel = mongoose.model('user',UserSchema)
module.exports = UserModel;