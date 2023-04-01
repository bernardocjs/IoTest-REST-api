const { isAuth } = require('./JWTverification')
const User = require('../models/user')

exports.ButtonStatus = (req, res) => {

    const auth = isAuth(req);
  
    //verifica se o token e valido
    if (!auth){
        return res.status(400).json({
            error: "Token nao e valido"
         })
    }

    const _id = req.userid._id;
    //encontra o usuario e o retona seu valor do botao
    User.findOne({_id}, (err, user) => {
        if(!user || err){
            return res.status(400).json({
                error: "ID not found"
            })
        }

       //retorna o valor do botao
        return res.status(200).json({
            "value": user.led,
        })
    })
     
}