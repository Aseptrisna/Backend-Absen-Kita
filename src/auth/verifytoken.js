const jwt = require("jsonwebtoken");
const config = require("../config/config");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ status: false, message: "No token provided" });
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ status: false, message: "Failed to authenticate token." });
    next();
  });
}

module.exports = verifyToken;
