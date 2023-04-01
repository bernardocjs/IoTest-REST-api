const { isAuth } = require("./JWTverification");
const User = require("../models/user");

exports.LedControl = (req, res) => {
  //verifica autorizacao
  const auth = isAuth(req);

  if (!auth) {
    return res.status(400).json({
      error: "Token nao e valido",
    });
  }
  const _id = { _id: req.userid._id };
  const value = { led: req.body.value };

  User.updateOne(_id, { $set: value }, (err, cli) => {
    if (err || !cli) {
      return res.status(400).send(`err: ${err}`);
    }
  });

  return res.status(200).json({
    err: "",
  });
};
