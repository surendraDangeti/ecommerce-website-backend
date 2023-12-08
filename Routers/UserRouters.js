const express = require("express");
const router = express.Router();
const { checkUser, createUser } = require('../controllers/users');


router.post("/signin", checkUser);
router.post("/signup", createUser);

module.exports = { router };
