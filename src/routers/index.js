const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const users = require("./user.router");
const aplication=require("./aplication.router")

router.use("/users", users);
router.use("/aplications", aplication);
module.exports = router;