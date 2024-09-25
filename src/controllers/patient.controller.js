import patientService from "../services/patient.service";
import userService from "../services/user.service";
import ApiError from "../../api-error";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single("file");

exports.getAll = async (req, res, next) => {
  try {
    const result = await patientService.getAll();
    if (result != []) {
      res.status(200).json({
        errcode: 0,
        message: "Get success",
        data: result,
      });
    } else {
      res.status(204).json({
        errcode: 0,
        message: "No content",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Can not get patient",
      error: error,
    });
  }
};

exports.getId = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ApiError(400, "Id is require"));
  }

  try {
    const result = await patientService.getId(req.params.id);
    if (result != []) {
      res.status(200).json({
        errcode: 0,
        message: "Get success",
        data: result,
      });
    } else {
      res.status(404).json({
        errcode: 0,
        message: "Not found",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Can not get patient",
      error: error,
    });
  }
};

exports.add = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log("Multer Error:", err);
      return res.status(500).json({ error: "Error uploading file" });
    } else if (err) {
      console.log("Unknown Error:", err);
      return res.status(500).json({ error: "Error uploading file" });
    }

    if (
      !req.body.name ||
      !req.body.birthday ||
      !req.body.address ||
      !req.body.profession ||
      !req.body.gender
    ) {
      return next(new ApiError(400, "not enough field require"));
    }

    const avatar = req.file.buffer.toString("base64");

    try {
      var addUser = await userService.add(req.body);
    } catch (error) {
      res.status(500).json({
        errcode: 1,
        message: "Add fail",
      });
      return next(new ApiError(500, "Can not add user"));
    }

    if (addUser.affectedRows === 1) {
      try {
        const result = await patientService.add(
          addUser.insertId,
          req.body,
          avatar
        );
        res.status(200).json({
          errcode: 0,
          message: "Add success",
          data: result,
        });
      } catch (error) {
        res.status(500).json({
          errcode: 1,
          message: "Add fail",
          error: error,
        });
      }
    } else {
      res.status(500).json({
        errcode: 1,
        message: "Add faild",
      });
    }
  });
};

exports.update = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ApiError(400, "Id is field require"));
  }

  var checkFileImg = true;

  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log("Multer Error:", err);
      return res.status(500).json({ error: "Error uploading file" });
    } else if (err) {
      console.log("Unknown Error:", err);
      checkFileImg = false;
    }

    if (
      !req.body.name ||
      !req.body.birthday ||
      !req.body.address ||
      !req.body.profession ||
      !req.body.gender ||
      !req.body.avatar
    ) {
      return next(new ApiError(400, "not enough field require"));
    }

    var avatar = null;

    if (checkFileImg) {
      avatar = req.file.buffer.toString("base64");
    }

    try {
      var result = null;
      if (avatar != null) {
        result = await patientService.update(req.params.id, req.body, avatar);
      } else {
        result = await patientService.updateNotImg(req.params.id, req.body);
      }
      if (result.affectedRows === 0) {
        res.status(404).json({
          errcode: 1,
          message: "Not found",
        });
      } else {
        res.status(200).json({
          errcode: 0,
          message: "update success",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        errcode: 1,
        message: "Update fail",
        error: error,
      });
    }
  });
};

exports.delete = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ApiError(400, "Id is field require"));
  }

  try {
    const result = await patientService.delete(req.params.id);
    if (result == 2) {
      res.status(200).json({
        errcode: 0,
        message: "delete success",
      });
    } else {
      res.status(404).json({
        errcode: 1,
        message: "Can not found doctor",
      });
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "delete fail",
      error: error,
    });
  }
};
