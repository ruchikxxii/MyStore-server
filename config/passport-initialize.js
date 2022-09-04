const passport  = require('passport')
const GoogleStartergy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
    username : String,
    googleID:String
})

const User = mongoose.model('User',UserSchema)

mongoose.connect(process.env.MongoDBAtlas)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})

passport.use(new GoogleStartergy({
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret,
    callbackURL:'/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({googleID : profile.id})
    .then((user)=>{
        if(user){
            done(null,user)
        }
        else{
            new User({
                googleID:profile.id,
                username:profile.displayName,
            }).save().then((newUser)=>{
                done(null,newUser)
            })
        }
    })
}));

module.exports = {User};