const router = require('express').Router()
const {User} = require('../config/passport-initialize')
const passport = require('passport')

router.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{
    res.redirect(`/MyStore?id=${req.user.id}`)
})

router.post('/auth/google',passport.authenticate('google',{
    scope:['profile']
}))

router.get('/auth/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/')
    });
})

router.get('/profile',(req,res)=>{
    User.findById(req.query.id).then(user=>{
        res.json(user)
    })
})

module.exports = router;