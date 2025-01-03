const express = require("express");
const router = express.Router();
const { signUp, login, forgotPassword } = require("../controllers/Auth");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

module.exports = router;
