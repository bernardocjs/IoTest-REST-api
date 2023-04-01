const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  //cria um novo usuario dentro do BD
  const u = new User(req.body);
  //salva as informacoes deste novo user
  u.save((err, newUser) => {
    if (err) {
      return res.json({
        err: `error: ${err}`,
      });
    }
    //retorna caso o processo de criacao tenha ocorrido corretamente
    return res.json({
      err: "",
      u,
    });
  });
};

exports.login = (req, res) => {
  const { user, pass } = req.body;

  //encontrando o usuario para realizar o login
  User.findOne({ user }, (err, u) => {
    if (err || !u) {
      return res.status(400).json({
        error: `Email ou senha incorreta ${err}`,
      });
    }

    // Utilizado para fazer a autenticacao do usuario enviado
    if (!u.authenticate(pass)) {
      return res.status(400).json({
        error: "Email ou senha incorreta",
      });
    }

    // criacao de token
    const token = jwt.sign({ _id: u._id }, process.env.SECRET);

    //criacao do cookie
    res.cookie("token", token, {
      expire: new Date() + 1,
      httpOnly: true,
      path: "/",
    });

    // adicionando o token para o usuario logado
    User.updateOne({ user }, { $set: { token: token } }, (err, cli) => {
      if (err || !cli) {
        return res.status(400).send(`err: ${err}`);
      }
    });

    //resposta e retorno do cookie
    return res.json({
      token,
    });
  });
};
