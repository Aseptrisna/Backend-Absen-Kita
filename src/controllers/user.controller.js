const UserModel = require("../models/user.model");
const Bcrypt = require("bcrypt");
const uuid = require("uuid");
const Response = require("../const/response");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Services = require("../services/nodemailer.service");

exports.signup = (data) =>
  new Promise((resolve, reject) => {
    // console.log(data)
    UserModel.findOne({
      email: data.email,
    }).then((user) => {
      if (user) {
        reject(Response.errorResponse("E-Mail Already Used"));
      } else {
        Bcrypt.hash(data.password, 10, (err, hash) => {
          data.password = hash;
          data.guid = uuid.v4();
          data.otp = Math.floor(Math.random() * (10000 - 10) + 10);
          UserModel.create(data)
            .then(() => {
              resolve(
                Response.successResponse("Account Registration Successful")
              );
              const token = jwt.sign(
                { guid: data.guid, otp: data.otp },
                config.secret,
                {
                  expiresIn: "168h",
                }
              );
              Services.sendConfirmationEmail(token,data.email);
            })
            .catch(() => {
              reject(Response.errorResponse("Account Registration Failed"));
            });
        });
      }
    });
  });

exports.getuser = async (req, res, next) => {
  const { page, limit } = req.body;
  try {
    const user = await UserModel.find()
      .sort({ create_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await UserModel.countDocuments();
    res.json(
      Object.assign(Response.successResponse("Successfully Get Data"), {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        user,
      })
    );
  } catch (err) {
    res.json(Response.errorResult());
  }
};

exports.delete = async (req, res, next) => {
  try {
    await UserModel.findOneAndDelete({ guid: req.params.guid });
    res.json(Response.successResponse("Successfully Deleting User"));
  } catch (error) {
    res.json(Response.errorResponse("Failed to Delete User"));
  }
};
exports.update = async (req, res, next) => {
  try {
    await UserModel.findOneAndUpdate(
      { guid: req.params.guid },
      {
        $set: req.body,
      }
    );
    res.json(Response.successResponse("Successfully Update User"));
  } catch (error) {
    res.json(Response.errorResponse("Failed to Update User"));
  }
};
exports.getbyguid = (data) =>
  new Promise((resolve, reject) => {
    UserModel.find({ guid: data.guid }).then((data) => {
      if (data) {
        if (data.length == 0) {
          reject(Response.errorResult());
        } else {
          resolve(
            Object.assign(Response.successResponse("Successfully Get Data"), {
              data: data,
            })
          );
        }
      } else {
        reject(Response.errorResult());
      }
    });
  });

exports.login = (data) =>
  new Promise((resolve, reject) => {
    // console.log(data);
    UserModel.findOne({
      email: data.email,
    }).then((user) => {
      if (user) {
        if (Bcrypt.compareSync(data.password, user.password)) {
          if (user.is_active) {
            const token = jwt.sign(
              { guid: user.guid, email: user.email, role: user.role },
              config.secret,
              {
                expiresIn: 86400,
              }
            );
            resolve(
              Object.assign(Response.successResponse("Login Successful"), {
                user: [user],
                token: token,
              })
            );
          } else {
            reject(
              Response.errorResponse(
                "Your Account Is Not Verified, Please Check Your Email"
              )
            );
          }
        } else {
          reject(Response.errorResponse("Wrong Password"));
        }
      } else {
        reject(Response.errorResponse("Unregistered E-Mail/Invalid Email"));
      }
    });
  });
