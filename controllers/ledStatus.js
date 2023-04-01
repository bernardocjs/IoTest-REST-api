const { isAuth } = require("./JWTverification");
const User = require("../models/user");

exports.ledStatus = (req, res) => {
  const auth = isAuth(req);

  if (!auth) {
    return res.status(400).json({
      error: "Token nao e valido",
    });
  }
  //encontrando o usuario logado no BD para receber o valor do led
  const _id = { _id: req.userid._id };
  User.findOne(_id, (err, user) => {
    if (!user || err) {
      return res.status(400).json({
        error: "ID not found",
      });
    }
    //retorna o valor do led dentro do usuario do BD
    return res.status(200).json({
      value: user.led,
    });
  });
};
