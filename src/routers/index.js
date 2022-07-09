const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const users = require("./user.router");
const aplication=require("./aplication.router");
const img =require("./image.router");
const absent=require("./absent.router")
global.__basedir =process.env.PATH_DEVELOPMENT;

router.use("/users", users);
router.use("/aplications", aplication);
router.use("/files", img);
router.use("/absent", absent);

router.use(express.static('static'))
router.use(express.static(__dirname + '/'));
module.exports = router;