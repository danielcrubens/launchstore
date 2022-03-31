const User = require('../models/User')
module.exports = {
    registerForm(req, res) {
        return res.render("user/register")
    },
    async post(req, res) {
        //check if has all fields
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }
        //check if user exists
        let { email, cpf_cnpj, password, passwordRepeat } = req.body
        cpf_cnpj = cpf_cnpj.replace(/\D/g,"")

        const user = await User.findOne({
            where: { email },
            or: { cpf_cnpj }
        })
        if(user) return res.send('Users exists')
                //check if password match
        if(password != passwordRepeat)
        return res.send('Password Mismatch')

        return res.send('passed!')

     
 }
}
