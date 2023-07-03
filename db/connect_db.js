const mongoose =require('mongoose')
const url ="mongodb://127.0.0.1:27017/user"

const connectDB = ()=>{
    // for local DB 
    return mongoose.connect(url)

    //for cloud DB
    //return mongoose.connect(database)

    .then(()=>{
        console.log("connect successully")
    })
    .catch((err)=>{
        console.log(err)
    })

}

module.exports=connectDB