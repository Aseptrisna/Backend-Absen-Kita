const express = require("express");
const router = express.Router();
const controller = require("../controllers/image.controller")
const multer = require("multer");
const path = require("path");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.env.PATH_DEVELOPMENT));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
router.post("/upload", controller.upload);
router.get("/get", controller.getListFiles);
router.get("/files/:name", controller.download);
router.post(
    "/contact/upload",
    multer({ storage: diskStorage }).single("file"),
    (req, res) => {
      const file = req.file.path;
      console.log(file);
      if (!file) {
        res.status(400).send({
          status: false,
          message: "Gagal Upload File",
          filename: "",
        });
      }
    res.status(200).send({
        status: "true",
        message: "Berhasil upload File",
        filename: req.file.filename ,
      });
    }
  );


module.exports = router;