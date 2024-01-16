const cloudinary = require('cloudinary').v2;//for image storing
const UserModel = require('../models/user')
const CourseModel = require('../models/Course')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

cloudinary.config({
    cloud_name: 'dwhyyymds',
    api_key: '368927138123755',
    api_secret: 'qFWQy6nuNH6yO7kFCzwG2F-Tp0Y',

});//Setting configuration parameters globally

class FrontController {

    static dashboard = async (req, res) => {
        try {
            //console.log(req.user)
            const { name, email, id, image } = req.user
            const btech = await CourseModel.findOne({ user_id: id, course: 'btech' })
            const mba = await CourseModel.findOne({ user_id: id, course: 'mba' })
            const mtech = await CourseModel.findOne({ user_id: id, course: 'mtech' })
            res.render("dashboard", { n: name, image: image, b: btech, ma: mba, m: mtech })
        }
        catch (error) {

            console.log(error)
        }
    }
    


     static login = (req, res) => {
        res.render("login", { message: req.flash('success'), error: req.flash('error') })//message showing
    }

    static registration= (req,res)=>{
    res.render("registration")
    }
    

      static about = async (req, res) => {
        try {
          const {name, email, id, image ,number } = req.user;
          const data = await UserModel.find()
          res.render('about',{n:name,image:image,id:id,e:email,m:number,d:data});
        } catch (error) {
          console.log(error);
        }
      };
      static contact = async (req, res) => {
        try {
          const { name, email, _id, image ,number } = req.user;
          
          res.render('contact',{n:name,image:image,id:_id,e:email,m:number});
        } catch (error) {
          console.log(error);
        }
      }
    

      
      static academic= async (req, res) => {
            try {
              const { name, email, _id, image ,number } = req.user;
              
              res.render('academic',{n:name,image:image,id:_id,e:email,m:number});
            } catch (error) {
              console.log(error);
            }
          }
        
    

    static registration = async (req, res) => {
        try {
            res.render("registration", { message: req.flash('error') })

        }
        catch (error) {
            console.log(error)

        }
    }
    static forget = async (req, res) => {
        try {
            res.render("forget")

        }
        catch (error) {
            console.log(error)

        }
    }
    static insert = async (req, res) => {

        // console.log(req.files.image) to check image
        const file = req.files.image //putting save image i file folder
        const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, { //for storing

            folder: 'studentimage'

        })
        // console.log(imageUpload)
        const { name, email, number, password, cpassword } = req.body//regristration names
        const user = await UserModel.findOne({ email: email })
        console.log(user)

        if (user) {
            req.flash('error', 'Email allready exists. ')//for printing message on login page
            res.redirect('/registration')
        }
        else {
            if (name && email && number && password && cpassword) {
                if (password == cpassword) {

                    try {
                        const hashpassword = await bcrypt.hash(password, 10)//10 is saltof round for moresecuring password
                        const result = new UserModel({
                            name: name,
                            email: email,
                            number: number,
                            password: hashpassword,
                            image: {
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url
                            }
                        })


                        await result.save()
                        req.flash('success', 'Registration successfully Please login here')//for printing message on login page
                        res.redirect('/')
                        //in redirect we give path of router


                    }
                    catch (error) {
                        console.log(error)

                    }
                }
                else {
                    req.flash('error', 'Password and Confirm password does not match. ')//for printing message on login page
                    res.redirect('/registration')
                }
            }
            else {
                req.flash('error', 'All Fields are required ')//for printing message on login page
                res.redirect('/registration')
            }
        }
        //  const result = new UserModel({
        //     name:req.body.name,
        //     email:req.body.email,
        //     number:req.body.number,
        //     password:req.body.password
        //  })

        //  await result.save()
        //  req.flash('success','Registration successfully Please login here')//for printing message on login page
        //  res.redirect('/')
        //  //in redirect we give path of router


    }

    static verify_login = async (req, res) => {

        try {
            // console.log(req.body) 
            const { email, password } = req.body
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                // console.log(user)
                if (user != null) {

                    const ismatch = await bcrypt.compare(password, user.password)

                    if (ismatch) {
                        //multiple login
                        if (user.role == 'student') {
                            //generate token 
                            const token = jwt.sign({ ID: user._id }, 'jungkookie@123#45678')
                            //console.log(token)
                            res.cookie('token', token)
                            res.redirect('/dashboard')
                        }
                        if (user.role == 'admin') {
                            //generate token 
                            const token = jwt.sign({ ID: user._id }, 'jungkookie@123#45678')
                            //console.log(token)
                            res.cookie('token', token)
                            res.redirect('/admin/dashboard')
                        }
                    }
                    else {
                        req.flash('error', 'Email Or Password is not valid')//for printing message on login page
                        res.redirect('/')
                    }

                } else {
                    req.flash('error', 'Your  not a register user ! Please Register First..')//for printing message on login page
                    res.redirect('/')
                }

            }
            else {
                req.flash('error', 'All Fields are required ')//for printing message on login page
                res.redirect('/')
            }

        }
        catch (error) {
            console.log(error)

        }
    }
    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/')

        }
        catch (error) {
            console.log(error)

        }
    }
    static campus = async (req, res) => {
        try {
          const { name, email, _id, image ,number } = req.user;
          
          res.render('campus',{n:name,image:image,id:_id,e:email,m:number});
        } catch (error) {
          console.log(error);
        }
      }
    
    static profile = async (req, res) => {
        try {
          const { name, email, _id, image ,number } = req.user;
          const data = await UserModel.find()
          res.render('profile',{n:name,image:image,id:_id,e:email,m:number,d:data});
        } catch (error) {
          console.log(error);
        }
      }
    static profile_update = async (req, res) => {
        try {
          //console.log(req.files.image)
          if (req.files) {
              const user = await UserModel.findById(req.user.id);
              const image_id = user.image.public_id;
              await cloudinary.uploader.destroy(image_id);
  
              const file = req.files.image;
              const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                  folder: "studentimage",
              });
              var data = {
                  name: req.body.name,
                  email: req.body.email,
                  image: {
                      public_id: myimage.public_id,
                      url: myimage.secure_url,
                  },
              };
          } else {
              var data = {
                  name: req.body.name,
                  email: req.body.email,
  
              }
          }
          const update_profile = await UserModel.findByIdAndUpdate(req.user.id, data)
          res.redirect('/profile')
      } catch (error) {
          console.log(error)
      }
  };
  static change_password = async (req, res) => {
    try {
        const { name, email, id, image } = req.user
        const tranformname = name.toUpperCase()
        //console.log(req.body)
        const { oldpassword, newpassword, cpassword } = req.body
        if (oldpassword && newpassword && cpassword) {
            const user = await UserModel.findById(id)
            const ismatched = await bcrypt.compare(oldpassword, user.password)
            if (!ismatched) {
                req.flash('error', 'old password is  incorrect')
                res.redirect('/profile')
            } else {
                if (newpassword !== cpassword) {
                    req.flash('error', 'Password does not match')
                    res.redirect('/profile')

                } else {
                    const newHashpassword = await bcrypt.hash(newpassword, 10)
                    await UserModel.findByIdAndUpdate(id, {
                        $set: { password: newHashpassword }
                    })
                    req.flash('message', 'Password changed successfully')
                    res.redirect('/')
                }
            }

        } else {
            req.flash('error', 'All fields are required')
            res.redirect('/profile')
        }

    } catch (error) {
        console.log(error)
    }
}

  static sendEmail = async (name, email) => {
    // console.log("email sending")
    //consollog("propertyName")
    // console.log(email)
  
    //connenct with the smtp server
  
    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
  
      auth: {
        user: "admin@gmail.com",
        pass: "uqltlwovtuaovloc",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Create course Registration Succesfully", // Subject line
      text: "hello", // plain text body
      html: `<b>${name}</b> Registration is successful! please login.. `, // html body
    });
    //console.log("Messge sent: %s", info.messageId);
  };
  
}

module.exports = FrontController 