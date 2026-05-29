const express = require("express");

const router = express.Router();

const {
    signupUser,
    loginUser
} = require("../controllers/authController");



// SIGNUP ROUTE

router.post("/signup", signupUser);



// LOGIN ROUTE

router.post("/login", loginUser);



module.exports = router;