const express = require('express')
const FrontController = require('../controllers/FrontController');
const CourseController = require('../controllers/CourseController');
const router=express.Router()
const checkuserauth= require('../midleware/auth');
const AdminController = require('../controllers/admin/AdminController');


//fontcontrollert
//route path
router.get('/',FrontController.login);
router.get('/dashboard',checkuserauth,FrontController.dashboard);
router.get('/registration',FrontController.registration);
router.get('/forget',FrontController.forget);
router.get("/about",checkuserauth,FrontController.about);
router.post("/insert",FrontController.insert);
router.post("/verify_login",FrontController.verify_login);
router.get("/logout",FrontController.logout);
router.post('/profile_update',checkuserauth,FrontController.profile_update)
router.get('/profile',checkuserauth,FrontController.profile)
router.get('/campus',checkuserauth,FrontController.campus);
router.get('/contact',checkuserauth,FrontController.contact);
router.get('/academic',checkuserauth,FrontController.academic);
router.post('/change_password',checkuserauth,FrontController.change_password)


//coursecontroller
router.post('/Course_insert',checkuserauth,CourseController.Course_insert)
router.get('/Course_display',checkuserauth,CourseController.Course_display)
router.get('/Course_display',checkuserauth,CourseController.Course_display)
router.get('/Course_view/:id',checkuserauth,CourseController.Course_view)
router.get('/Course_edit/:id',checkuserauth,CourseController.Course_edit)
router.post('/Course_update/:id',checkuserauth,CourseController.Course_update)
router.get('/Course_delete/:id',checkuserauth,CourseController.Course_delete)
router.post('/profile_update',checkuserauth,CourseController.Course_insert)

//admin controller
router.get('/admin/dashboard',checkuserauth,AdminController.dashboard)
router.get('/admin/profile_view/:_id',checkuserauth,AdminController.profile_view);
router.post('/admin/update_approve/:_id',checkuserauth,AdminController.update_approve);


module.exports = router

