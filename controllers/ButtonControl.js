const { isAuth } = require("./JWTverification");
const User = require("../models/user");

exports.ButtonControl = (req, res) => {
  //verifica autorizacao
  const auth = isAuth(req);
  const _id = { _id: req.userid._id };
  const value = { led: req.body.value };

  //verifica se o token é valido para login
  if (!auth) {
    return res.status(400).json({
      error: "Token nao e valido",
    });
  }

  //Encontra o User logado no BD via Mongoose e realiza o update do valor do led
  User.updateOne(_id, value, (err, cli) => {
    if (err || !cli) {
      return res.status(400).send(`err: ${err}`);
    }
  });

  //retorna que as alteracoes foram feitas corretamente
  return res.status(200).json({
    err: "",
  });
};
