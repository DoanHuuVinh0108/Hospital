import ApiError from "../../api-error";
import UserServices from "../services/user.service";

exports.getId = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ApiError(400, "Id is require"));
  }

  try {
    const result = await UserServices.getId(req.params.id);

    if (result != []) {
      res.status(200).json({
        errcode: 0,
        message: "Get success",
        data: result,
      });
    } else {
      res.status(404).json({
        errcode: 1,
        message: "Not found",
        error: error,
      });
    }
    
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "get fail",
      error: error,
    });
  }
};

exports.add = async (req, res, next) => {
  if (!req.body.password || !req.body.email || !req.body.phonenumber) {
    res.send(new ApiError(400, "Not enough required fields"));
  }

  try {
    const result = await UserServices.add(req.body);
    res.status(200).json({
      errcode: 0,
      message: "Add success",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Add fail",
      error: error
    })
  }
};

exports.update = async (req, res, next) => {
  if (!req.body.password || !req.body.email || !req.body.phonenumber) {
    res.send(new ApiError(400, "Not enough required fields"));
  }

  if (!req.params.id) {
    return next(new ApiError(400, "Id is require"));
  }

  try {
    const result = await UserServices.update(req.params.id, req.body);
    if (result.affectedRows === 0) {
      res.status(404).json({
        errcode: 1,
        message: "Not found"
      });
    } else {
      res.status(200).json({
        errcode: 0,
        message: "update success",
        data: result
      });
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "update fail",
      error: error,
    });
  } 
};

exports.delete = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ApiError(400, "Id is require"));
    }
    
    try {
      const result = await UserServices.delete(req.params.id);
      if (result.affectedRows === 0) {
        res.status(404).json({
          errcode: 1,
          message: "Can not found user",
          error: error,
        });
      } else {
        res.status(200).json({
          errcode: 0,
          message: "delete success",
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
