const express = require('express')
// const cookieSession = require('cookie-session');
const AuthRouter = require(__dirname+'/routes/auth')
const passport = require('passport');
const mongoose = require('mongoose')
const session = require('express-session')
require('dotenv').config()

const app = express();

app.use(session({
    secret:process.env.Secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res)=>{
    if(req.user){
        res.redirect(`/MyStore?id=${req.user.id}`)
    }
    else{
        res.sendFile(__dirname+'/public/home.html')
    }
})

app.get('/MyStore',(req,res)=>{
    res.sendFile(__dirname+'/public/myStore.html')
})

app.use(AuthRouter)

app.use(express.static(__dirname+'/public'))

app.listen(process.env.PORT,()=>{
    console.log(`server up on port ${process.env.PORT}`)
})