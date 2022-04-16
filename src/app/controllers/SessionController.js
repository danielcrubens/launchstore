const User = require('../models/User')
const crypto = require('crypto')
const mailer = require('../../lib/mailer')
module.exports = {
    loginForm(req, res) {
        return res.render("session/login")
    },
    login(req, res) {
        req.session.userId = req.user.id
        return res.redirect("/users")
    },
    logout(req, res) {
        req.session.destroy()
        return res.redirect("/")
    },
    forgotForm(req, res) {
        return res.render("session/forgot-password")
    },

    async forgot(req, res) {

        try{

        }catch(err){
            console.error(err)
            return res.render("session/forgot-password",{
                error: "Erro inesperado, tente novamente"
            })
        }
        const user = req.user
        //um token para esse usuário
        const token = crypto.randomBytes(20).toLocaleString("hex")
        //criar ema expiração
        let now = new Date()
        now = now.setHours(now.getHours() + 1)

        await User.update(user.id, {
            reset_token: token,
            reset_token_expires: now
        })
        // enviar um email com  um link de recuperação de senha
        await mailer.sendMail({
            to: user.email,
            from: 'no-replay@launchstore.com.br',
            subject:'Recuperação de senha',
            html:`<h2> Perdeu a chave?</h2>
            <p> Não se preocupe, clique no link abaixo para recuperar sua senha</p>
            <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
            RECUPERAR SENHA
            <a/>
            
            `
        })
        //avisar o usuário que enviamos o email
        return res.render("session/forgot-password",{
            success: "Verifique seu email para resetar sua senha!"
        })

    },
    resetForm(req,res){
        return res.render("session/password-reset",{token:req.query.token})
    },
    reset(req,res){
        const {email, paassword,paasswordRepeat, token} = req.body
        try{
//procuras usuário

        }catch(err){
            console.error(err)

            return res.render("session/password-reset",{
                error: "Erro inesperado, tente novamente"
            })
        }
    }
}
