const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const routes = require("./routers");
const cors=require("cors")
const Mongo=require('../src/config/mongo');


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'))
app.use(express.static(process.env.PATH));
app.use(routes)
module.exports = app;