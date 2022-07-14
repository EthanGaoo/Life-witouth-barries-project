const mongoose=require('mongoose')

const Schema=mongoose.Schema

const serviceSchema=new Schema(
    {
    title:{type:String, required:true},
    phone:{type:String},
    category:String,
    email:{type:String},
    location:{type:String},
    description:String,
    imageURL:{type:String,default:`https://i.imgur.com/ShxuhMu.jpeg`},
    placeID:String,
    greatArea:String,
    },
    {timeseries:true}
)

const Service=mongoose.model('service',serviceSchema)

module.exports=Service
