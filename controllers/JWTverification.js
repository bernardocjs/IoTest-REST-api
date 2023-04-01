const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuth = (req, res) => {
  //Passa as informacoes do Bearer que estavam no header e salva somente o token
  const cookie = req.headers["cookie"].split("=")[1];

  //decodifica o token armazendo o id
  const decoded = jwt.verify(cookie, process.env.SECRET);
  req.userid = decoded;
  const _id = { _id: req.userid._id };

  User.findOne({ _id }, (err, user) => {
    if (!user || err) {
      return res.status(400).json({
        error: "ID nao encontrado",
      });
    }
    //caso o token nao seja valido
    if (cookie !== user.token) {
      return 0;
    }
  });
  //caso o token seja valido
  return 1;
};

exports.logout = (req, res) => {
  const cookie = req.headers["cookie"].split("=")[1];
  res.cookie("token", cookie, {
    expire: new Date(0),
    httpOnly: true,
    path: "/",
  });
};
