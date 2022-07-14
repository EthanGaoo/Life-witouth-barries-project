require('dotenv').config()
const apiKey=process.env.APIKEY

const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: apiKey,
    formatter: null
  };
const  geocoder = NodeGeocoder(options);


const express=require('express')
const serviceRouter=express.Router()
const upload=require('../middleware/upload')
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

serviceRouter.get('/search/Adelaide',(req,res)=>{
    Service.find({greatArea:"Adelaide"})
    .exec()
    .then((services)=>{
        console.log(services)
        res.render('lwb/index.ejs',{
         currentUser: req.session.currentUser,
         services:services,
         baseUrl:req.baseUrl,
         tabTitle:`Life without Gap`
        })
    })
})
serviceRouter.get('/search/Melbourne',(req,res)=>{
    Service.find({greatArea:"Melbourne"})
    .exec()
    .then((services)=>{
        console.log(services)
        res.render('lwb/index.ejs',{
         currentUser: req.session.currentUser,
         services:services,
         baseUrl:req.baseUrl,
         tabTitle:`Life without Gap`
        })
    })
})
serviceRouter.get('/search/Sydney',(req,res)=>{
    Service.find({greatArea:"Sydney"})
    .exec()
    .then((services)=>{
        console.log(services)
        res.render('lwb/index.ejs',{
         currentUser: req.session.currentUser,
         services:services,
         baseUrl:req.baseUrl,
         tabTitle:`Life without Gap`
        })
    })
})
serviceRouter.get('/search/Perth',(req,res)=>{
    Service.find({greatArea:"Perth"})
    .exec()
    .then((services)=>{
        console.log(services)
        res.render('lwb/index.ejs',{
         currentUser: req.session.currentUser,
         services:services,
         baseUrl:req.baseUrl,
         tabTitle:`Life without Gap`
        })
    })
})
serviceRouter.get('/search/Brisbane',(req,res)=>{
    Service.find({greatArea:"Brisbane"})
    .exec()
    .then((services)=>{
        console.log(services)
        res.render('lwb/index.ejs',{
         currentUser: req.session.currentUser,
         services:services,
         baseUrl:req.baseUrl,
         tabTitle:`Life without Gap`
        })
    })
})



const place=(params)=>{
   return  geocoder.geocode(params)
    .then((res)=> {
    return   (res[0].extra.googlePlaceId)
    })
}

//new
serviceRouter.get('/new',(req,res)=>{
    res.render('lwb/new.ejs',{
        baseUrl:req.baseUrl,
        currentUser:req.session.currentUser,
        tabTitle:`New Sevice`
    })
})
serviceRouter.post('/',upload.single('image'),(req,res)=>{
    req.body.imageURL=req.file.path
    place(req.body.location)
    .then((data)=>{
        req.body.placeID=data
    Service.create(req.body)
    .then((data)=>{
        console.log(data)
        res.redirect(req.baseUrl)
    })
    })
})
//show
serviceRouter.get('/:id',(req,res)=>{
    Service.findById(req.params.id)
    .exec()
    .then((service)=>{
        place(service.location)
        .then((data)=>{
            service.placeID=data
        res.render('lwb/show.ejs',{
            baseUrl:req.baseUrl,
            service:service,
            currentUser:req.session.currentUser,
            tabTitle:service.title
        })
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
serviceRouter.put('/:id',upload.single('image'),(req,res)=>{
    console.log(req.body)
    req.body.imageURL=req.file.path
    Service.findByIdAndUpdate(req.params.id,req.body)
    .exec()
    .then((data)=>{
        // console.log(data)
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
