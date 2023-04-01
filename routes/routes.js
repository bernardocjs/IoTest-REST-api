const express = require("express");
const { login } = require("../controllers/authLogin");
const { signup } = require("../controllers/authLogin");
const { LedControl } = require("../controllers/ledControl");
const { ledStatus } = require("../controllers/ledStatus");
const { ButtonControl } = require("../controllers/buttonControl");
const { ButtonStatus } = require("../controllers/buttonStatus");
const { logout } = require("../controllers/JWTverification");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/led", LedControl);
router.get("/led/status", ledStatus);
router.get("/button/status", ButtonStatus);
router.post("/button", ButtonControl);

router.post("/logout", logout);

module.exports = router;
