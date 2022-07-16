const express = require("express");
const router = express.Router();
const Controller = require("../controllers/absent.controller");
const verifyToken = require("../auth/verifytoken");

router.post("/add", (req, res, next) => {
  Controller.add(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
router.post("/getbyuser",Controller.getdetailabsen)
router.post("/get",verifyToken,Controller.getabsen)
router.post("/getdetail",verifyToken,Controller.getabsendetail)
module.exports = router;
