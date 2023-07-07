const mongoose =require('mongoose')
// const url ="mongodb://127.0.0.1:27017/user"
const live_url = "mongodb+srv://ritunjayasaxena309:khushi@cluster0.3lgflhk.mongodb.net/"

const connectDB = ()=>{
    // for local DB 
    return mongoose.connect(live_url)

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