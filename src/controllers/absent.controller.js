const Model = require("../models/absent.model");
const ModelDetail = require("../models/detailabsent.model");
const uuid = require("uuid");
const Response = require("../const/response");
const moment = require("moment");
const date = new Date();
const bulan = date.getMonth();
const tahun = date.getFullYear();
const tanggal = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
const jam = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
// const bulan = moment().format("MM");
// const tahun = moment().format("YYYY");
// const tanggal = moment().format("DD-MM-YYYY");
// const jam = moment().format("hh:mm:ss");

exports.add = (data) =>
  new Promise((resolve, reject) => {
    Model.findOne({ user: data.user, bulan: bulan, tahun: tahun }).then(
      (exist) => {
        if (exist) {
          data.jumlah = exist.jumlah + 1;
          data.bulan = bulan;
          data.tahun = tahun;
          data.guid = uuid.v4();
          data.jam = jam;
          data.tanggal = tanggal;
          data.absen = exist.guid;
          Model.findOneAndUpdate(
            { user: data.user },
            { jumlah: exist.jumlah + 1 }
          )
            .then((success) => {
              if (success) {
                ModelDetail.create(data)
                  .then(() => {
                    resolve(
                      Response.successResponse(
                        "Successfully Adding Data Absent"
                      )
                    );
                  })
                  .catch((e) =>
                    reject(Response.errorResponse("Failed to Send Absent"))
                  );
              } else {
                reject(Response.errorResponse("Failed to Send Absent"));
              }
            })
            .catch((e) =>
              reject(Response.errorResponse("Failed to Send Absent !"))
            );
        } else {
          data.jumlah = 1;
          data.bulan = bulan;
          data.tahun = tahun;
          data.guid = uuid.v4();
          data.jam = jam;
          data.tanggal = tanggal;
          Model.create(data)
            .then((success) => {
              if (success) {
                data.absen = data.guid;
                ModelDetail.create(data)
                  .then(() => {
                    resolve(
                      Response.successResponse(
                        "Successfully Adding Data Absent"
                      )
                    );
                  })
                  .catch((e) =>
                    reject(Response.errorResponse("Failed to Send Absent"))
                  );
              } else {
                reject(Response.errorResponse("Failed to Send Absent"));
              }
            })
            .catch((e) =>
              reject(Response.errorResponse("Failed to Send Absent !"))
            );
        }
      }
    );
  });
exports.getdetailabsen = async (req, res) => {
  const { page, limit, guid } = req.body;
  try {
    const aplication = await ModelDetail.find({ user: guid })
      .sort({ create_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Model.countDocuments({ user: guid });
    res.json(
      Object.assign(Response.successResponse("Successfully Get Data"), {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        data: aplication,
      })
    );
  } catch (err) {
    res.json(Response.errorResult());
  }
};

exports.getabsen = async (req, res) => {
  const { page, limit, guid, bulan, unit, instansi, tahun } = req.body;
  if (bulan == "" && unit == "" && tahun == "") {
    console.log("Get Data No Filter");
    try {
      const aplication = await Model.find({ instansi: instansi })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Model.countDocuments({ instansi: instansi });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  } else if (bulan == "" && tahun == "") {
    console.log("Get Data By Units");
    try {
      const aplication = await Model.find({ instansi: instansi, unit: unit })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Model.countDocuments({
        instansi: instansi,
        unit: unit,
      });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  } else if (unit == "" && bulan == "") {
    console.log("Get Data By Years");
    try {
      const aplication = await Model.find({ instansi: instansi, tahun: tahun })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Model.countDocuments({
        instansi: instansi,
        tahun: tahun,
      });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  } else if (tahun == "" && unit == "") {
    console.log("Get Data By Month");
    try {
      const aplication = await Model.find({ instansi: instansi, bulan: bulan })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Model.countDocuments({
        instansi: instansi,
        bulan: bulan,
      });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  } else if (unit == "") {
    console.log("Get Data By Month and Years");
    try {
      const aplication = await Model.find({
        instansi: instansi,
        bulan: bulan,
        tahun: tahun,
      })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Model.countDocuments({
        instansi: instansi,
        bulan: bulan,
        tahun: tahun,
      });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  } else {
    console.log("Get Data By ALL");
    try {
      const aplication = await Model.find({
        instansi: instansi,
        unit: unit,
        bulan: bulan,
        tahun: tahun,
      })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Model.countDocuments({
        instansi: instansi,
        unit: unit,
        bulan: bulan,
        tahun: tahun,
      });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  }
};

exports.getabsendetail = async (req, res) => {
  const { page, limit, guid, bulan, unit, instansi, tahun } = req.body;
  if (bulan == "" && unit == "" && tahun == "") {
    console.log("Get Data No Filter");
    try {
      const aplication = await ModelDetail.find({ instansi: instansi })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await ModelDetail.countDocuments({ instansi: instansi });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  } else if (bulan == "" && tahun == "") {
    console.log("Get Data By Units");
    try {
      const aplication = await Model.find({ instansi: instansi, unit: unit })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Model.countDocuments({
        instansi: instansi,
        unit: unit,
      });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  } else if (unit == "" && bulan == "") {
    console.log("Get Data By Years");
    try {
      const aplication = await Model.find({ instansi: instansi, tahun: tahun })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Model.countDocuments({
        instansi: instansi,
        tahun: tahun,
      });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  } else if (tahun == "" && unit == "") {
    console.log("Get Data By Month");
    try {
      const aplication = await Model.find({ instansi: instansi, bulan: bulan })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Model.countDocuments({
        instansi: instansi,
        bulan: bulan,
      });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  } else if (unit == "") {
    console.log("Get Data By Month and Years");
    try {
      const aplication = await Model.find({
        instansi: instansi,
        bulan: bulan,
        tahun: tahun,
      })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Model.countDocuments({
        instansi: instansi,
        bulan: bulan,
        tahun: tahun,
      });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  } else {
    console.log("Get Data By ALL");
    try {
      const aplication = await Model.find({
        instansi: instansi,
        unit: unit,
        bulan: bulan,
        tahun: tahun,
      })
        .sort({ create_at: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Model.countDocuments({
        instansi: instansi,
        unit: unit,
        bulan: bulan,
        tahun: tahun,
      });
      res.json(
        Object.assign(Response.successResponse("Successfully Get Data"), {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          data: aplication,
        })
      );
    } catch (err) {
      res.json(Response.errorResult());
    }
  }
};