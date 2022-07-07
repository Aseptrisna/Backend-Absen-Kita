const express = require("express");
const router = express.Router();
const Controller = require("../controllers/aplication.controller");
const verifyToken = require("../auth/verifytoken");

router.post("/add", verifyToken, (req, res, next) => {
  Controller.add(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
router.post("/getbyguid", verifyToken, (req, res, next) => {
    Controller.getbyguid(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  });
router.post("/get", verifyToken,Controller.getaplication)
router.delete("/delete/:guid",verifyToken,Controller.delete)
module.exports = router;
