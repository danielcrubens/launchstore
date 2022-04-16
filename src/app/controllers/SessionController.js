const crypto = require('crypto')
const User = require('../models/User')
module.exports = {
    loginForm(req,res){
        return res.render("session/login")
    },
    login(req,res){
        req.session.userId = req.user.id
        return res.redirect("/users")
    },
    logout(req,res){
        req.session.destroy()
        return res.redirect("/")
    },
    forgotForm(req,res){
        return res.render("session/forgot-password")
    },

    forgot(req, res){
         const user = req.user
        //um token para esse usuário
        const token =  crypto.randomBytes(20).toLocaleString("hex")
        //criar ema expiração
        let now = new Date()
        now = now.setHours(now.getHours()+1)
        await  User.update(user.id,{
            reset_token: token,
            reset_token_expires:now
        })

    }
}
