require('dotenv').config()

const mongoose=require('mongoose')
const Service=require('../models/lwb')
const dummyServices=require('./services')

const dbURL=process.env.MONGODB_URL

mongoose.connect(dbURL,()=>{

    Service.collection.drop()
    .then(()=>{
    return Service.insertMany(dummyServices)
    })
    .then((insertedData)=>{
        console.log(insertedData)
        mongoose.connection.close()
    })
})
