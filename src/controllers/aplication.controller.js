const Model = require("../models/aplication.model");
const Response = require("../const/response");
const Logger = require("../utils/logger");
const uuid = require("uuid");
const config = require("../config/config");
const moment = require("moment");
const jwt = require("jsonwebtoken");

exports.add = (data) =>
  new Promise((resolve, reject) => {
    data.guid = uuid.v4();
    const token = jwt.sign({ guid: data.guid }, config.secret, {
      expiresIn: "1825d",
    });
    data.acces_token = token;
    data.client_secret =
      data.name + "-" + uuid.v4() + "-" + moment().format("YYYY");
    data.client_id = data.type + "-" + uuid.v4() + "-" + data.name;
    Model.findOne({ name: data.name }).then((exist) => {
      if (exist) {
        reject(Response.errorResponse(" Name Already Used"));
      } else {
        Model.findOne({ package_name: data.package_name }).then((ready) => {
          if (ready) {
            reject(Response.errorResponse("Package Name Already Used"));
          } else {
            Model.create(data)
              .then(() =>
                resolve(
                  Response.successResponse(
                    "Successfully Adding Application Data"
                  )
                )
              )
              .catch((e) =>
                reject(Response.errorResponse("Failed to Add Application Data"))
              );
          }
        });
      }
    });
  });
exports.getbyguid = (data) =>
  new Promise((resolve, reject) => {
    Model.findOne({ guid: data.guid }).then((data) => {
      if (data) {
        if (data.length == 0) {
          reject(Response.errorResult());
        } else {
          resolve(
            Object.assign(Response.successResponse("Successfully Get Data"), {
              data: [data],
            })
          );
        }
      } else {
        reject(Response.errorResult());
      }
    });
  });

exports.getaplication = async (req, res) => {
  const { page, limit } = req.body;
  try {
    const aplication = await Model.find()
      .sort({ create_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Model.countDocuments();
    res.json(
      Object.assign(Response.successResponse("Successfully Get Data"), {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        aplication,
      })
    );
  } catch (err) {
    res.json(Response.errorResult());
  }
};

exports.delete = async (req, res) => {
  try {
    await Model.findOneAndDelete({ guid: req.params.guid });
    res.json(Response.successResponse("Successfully Deleting Data"));
  } catch (error) {
    res.json(Response.errorResponse("Failed to Delete Data"));
  }
};

exports.update = async (req, res) => {
  try {
    await Model.findOneAndUpdate(
      { guid: req.params.guid },
      {
        $set: req.body,
      }
    );
    res.json(Response.successResponse("Successfully Update Data"));
  } catch (error) {
    res.json(Response.errorResponse("Failed to Update Data"));
  }
};
