const mongoose=require('mongoose')

const Schema=mongoose.Schema

const serviceSchema=new Schema(
    {
    title:{type:String, required:true},
    phone:{type:Number},
    email:{type:String},
    location:{type:String},
    description:String,
    imageURL:{type:String,default:`https://i.imgur.com/ShxuhMu.jpeg`},
    googleID:String,
    },
    {timeseries:true}
)

const Service=mongoose.model('service',serviceSchema)

module.exports=Service
