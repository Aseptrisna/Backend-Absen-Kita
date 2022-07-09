const uploadFile = require("../middleware/uploadfile");
const fs = require("fs");
const dotenv = require("dotenv");
const { regexpToText } = require("nodemon/lib/utils");
dotenv.config();
var path = process.env.PATH_DEVELOPMENT;

upload = async (req, res) => {
  var date=new Date().getTime()
  try {
    await uploadFile(req, res);
    // console.log(req.file)
    if (req.file == undefined) {
      return res.status(400).send({ status: "false", message: "gagal" });
    }
    res.status(200).send({
      status: "true",
      message: "Berhasil upload File",
      filename: req.file.filename ,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        status: "false",
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).send({
      status: "false",
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = path;
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: "http://localhost:4000/" + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = path;

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
