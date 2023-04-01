const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

//conexao DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database conectada");
  })
  .catch(() => {
    console.log("Database nao conectada");
  });
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const userRoutes = require("./routes/routes");

app.use("/api", userRoutes);
//servidor basico
app.get("/", (req, res) => {
  res.status(200).json({});
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({ error: err.message });
});

app.listen(3001, () => {
  console.log("listening on port 3000");
});
