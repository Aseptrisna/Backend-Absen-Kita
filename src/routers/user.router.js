const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../auth/verifytoken");

router.post("/signup", (req, res) => {
  userController
    .signup(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
router.post("/signin", (req, res) => {
  userController
    .login(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
router.post("/getbyguid", verifyToken, (req, res, next) => {
  userController
    .getbyguid(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
router.post("/get", verifyToken, userController.getuser);
router.delete("/delete/:guid", verifyToken, userController.delete);
router.put("/update/:guid", verifyToken, userController.update);

module.exports = router;
