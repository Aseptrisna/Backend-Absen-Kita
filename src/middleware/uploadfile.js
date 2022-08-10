const util = require("util");
const multer = require("multer");
const maxSize = 5 * 5024 * 5024;
const dotenv = require("dotenv");
const uuid = require("uuid");
dotenv.config();
var path = process.env.PATH_DEVELOPMENT;
var timestamp=new Date().getTime()+"-"+new Date().getDay()+"-"+
new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()+"-"

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null,timestamp+uuid.v4()+".png");
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;