const express=require('express')
const bcrypt=require('bcrypt')
const User=require('../models/users')
const sessionsRouter=express.Router()

sessionsRouter.get('/login',(req,res)=>{
    res.render('sessions/login.ejs',{
        tabTitle:'Log In',
        baseUrl:req.baseUrl,
        currentUser:req.session.currentUser
    })
})

sessionsRouter.post('/login',(req,res)=>{
    User.findOne({username:req.body.username})
    .exec()
    .then((user)=>{
        if(!user){
            req.flash('error','Username or password is incorrect')
            return res.redirect('/login')
        }
        const passwordIsCorrect=bcrypt.compareSync(req.body.password,user.password)
        if(!passwordIsCorrect){
            req.flash(`error`,`Username or password is incorrect`)
            res.redirect('/login')
        }else{
            req.session.currentUser=user
            res.redirect('/services/lwb')
        }
    })
})


sessionsRouter.delete('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/services/lwb')
    })
})

module.exports=sessionsRouter
