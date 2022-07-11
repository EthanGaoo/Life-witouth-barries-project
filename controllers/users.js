const express=require('express')
const bcrypt=require('bcrypt')
const User=require('../models/users')
const userRouter=express.Router()


userRouter.get('/signup',(req,res)=>{
    res.render('users/signup.ejs',{
        baseUrl:req.baseUrl,
        currentUser:req.session.currentUser,
        tabTitle:`Sign Up`
    })
})


userRouter.post('/',(req,res)=>{
    req.body.password=bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync()
    )
    User.create(req.body)
    .then(()=>{
        res.redirect('/services/lwb')
    })
    .catch(()=>{
        req.flash('info','Username already exists')
        res.redirect(req.baseUrl+'/signup')
    })
})

module.exports=userRouter
