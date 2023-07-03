const express = require('express')
const app = express()
const port = 3000.
const web = require('./routes/web')
const connectDB = require('./db/connect_db')
//for fileupload
const fileUpload =require("express-fileupload");
//message show start
var session = require('express-session')
var flash = require('connect-flash')
//cookies for creating tokens
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(fileUpload({useTempFiles: true}))//for storing file in temp 

app.use(session({
  secret:'secret',
  cookie:{maxAge: 60000 },
  resave:false,
  saveUninitialized: false,
}));// to sucess msg

app.use(flash());
//end
app.use(express.urlencoded({extended:true}))
//connect_db
connectDB()


app.set('view engine', 'ejs')

//route local:host
app.use('/',web)
//static files for css use
app.use(express.static('public'))
  


//server create
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })