require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const methodOverride=require('method-override')
const session=require('express-session')
const flash=require('express-flash')
const mongoDBSession=require('connect-mongodb-session')

const lwbController=require('./controllers/lwb')
const userController=require('./controllers/users')
const sessionsController=require('./controllers/session')

const app=express()
const PORT=process.env.PORT
const dbURL=process.env.MONGODB_URL
const MongoDBStore=mongoDBSession(session)
const sessionStore=new MongoDBStore({
    uri:dbURL,
    collection:'session'
})
// middleware
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:sessionStore
}))
app.use(flash())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use('/',(req,res)=>{
 res.redirect('/login')
})
app.use('/',sessionsController)
app.use('/services/lwb',lwbController)
app.use('/users',userController)



mongoose.connect(dbURL,()=>{
    console.log('Connected to LWB db')
})
app.listen(PORT,()=>{
    console.log(`App is running at PORT: `,PORT)
})
