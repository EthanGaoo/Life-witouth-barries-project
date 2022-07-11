const express=require('express')
const serviceRouter=express.Router()

const Service=require('../models/lwb')

const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/login')
    }
    next()
  }

serviceRouter.use(isLoggedIn)

// index
serviceRouter.get('/',(req,res)=>{
    Service.find()
    .exec()
    .then((services)=>{
        res.render('lwb/index.ejs',{
         currentUser: req.session.currentUser,
         services:services,
         baseUrl:req.baseUrl,
         tabTitle:`Life without barries`
        })
    })
})
//search
serviceRouter.get('/search',(req,res)=>{

    Service.find({title: { $regex: '.*' + req.query.search + '.*' ,$options:'i'} })
    .exec()
    .then((services)=>{
        res.render('lwb/index.ejs',{
         currentUser: req.session.currentUser,
         services:services,
         baseUrl:req.baseUrl,
         tabTitle:`Life without barries`
        })
    })

})
//new
serviceRouter.get('/new',(req,res)=>{
    res.render('lwb/new.ejs',{
        baseUrl:req.baseUrl,
        currentUser:req.session.currentUser,
        tabTitle:`New Sevice`
    })
})
serviceRouter.post('/',(req,res)=>{
    Service.create(req.body)
    .then(()=>{
        res.redirect(req.baseUrl)
    })
})
//show
serviceRouter.get('/:id',(req,res)=>{
    Service.findById(req.params.id)
    .exec()
    .then((service)=>{
        res.render('lwb/show.ejs',{
            baseUrl:req.baseUrl,
            service:service,
            currentUser:req.session.currentUser,
            tabTitle:service.title
        })
    })
})

//delete
serviceRouter.delete('/:id',(req,res)=>{
    Service.findByIdAndDelete(req.params.id)
    .exec()
    .then(()=>{
        res.redirect(req.baseUrl)
    })
})

//update
serviceRouter.get('/:id/edit',(req,res)=>{
   Service.findById(req.params.id)
   .exec()
   .then((service)=>{
    res.render('lwb/edit.ejs',{
        currentUser:req.session.currentUser,
        baseUrl:req.baseUrl,
        service:service,
        tabTitle:'Edit Service'+service.title
    })
   })
})
serviceRouter.put('/:id',(req,res)=>{
    Service.findByIdAndUpdate(req.params.id,req.body)
    .exec()
    .then(()=>{
        res.redirect(req.baseUrl)
    })
})


serviceRouter.get('/',(req,res)=>{
    Service.find(req.body.title)
    .exec()
    .then((service)=>{
        res.render('partials/head.ejs',{
         currentUser: req.session.currentUser,
         service:service,
         baseUrl:req.baseUrl,
         tabTitle:`Life without barries`
        })
    })
})






module.exports=serviceRouter
