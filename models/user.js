const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, unique: true },
    Password_enc: { type: String },
    salt: String,
    led: { type: Number },
  },
  { timestamps: true }
);

//variavel virtal para que receba a senha e transforme ela em cripto
userSchema
  .virtual("pass")
  .set(function (pass) {
    this.led = 0;
    this.salt = Math.random();
    this.Password_enc = this.securepassword(pass);
  })
  .get(function () {
    return this.password;
  });

userSchema.methods = {
  //autenticando a senha
  authenticate: function (input_senha) {
    return this.securepassword(input_senha) === this.Password_enc;
  },
  //encripitando a senha
  securepassword: function (input_senha) {
    if (!input_senha) {
      return "Precisa inserir a senha";
    }

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(input_senha)
        .digest("hex");
    } catch (err) {
      // console.log(err);
      return err;
    }
  },
};

module.exports = mongoose.model("User", userSchema);
