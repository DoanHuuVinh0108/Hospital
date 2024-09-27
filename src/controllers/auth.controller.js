import authService from "../services/auth.service";
import userService from "../services/user.service";
import jwt from "jsonwebtoken";
import ApiError from "../../api-error";
import bcrypt from "bcryptjs";

exports.login = async (req, res, next) => {
  if (!req.body) {
    return next(new ApiError(400, "Email or password is require field"));
  }

  try {
    const resultInfor = await authService.login(req.body);

    if (resultInfor.length === 0) {
      res.status(404).json({
        sussess: false,
        message: "User not found",
      });
    }

    const check = await bcrypt.compare(
      req.body.password,
      resultInfor[0].Password
    );

    if (check) {
      try {
        var role = "";
        if (resultInfor[0].Role === 0) {
          role = "Patient";
        } else {
          role = "Doctor";
        }

        //Creating jwt token
        var token = jwt.sign(
          {
            role: role,
            email: resultInfor[0].Email,
          },
          "secretkeyappearshere",
          { expiresIn: "1h" }
        );
      } catch (error) {
        return next(new ApiError(500, error.message));
      }

      res.status(200).json({
        sussess: true,
        message: "Login success",
        data: { resultInfor, token },
      });
    } else {
      res.status(404).json({
        sussess: false,
        message: "Login fail",
      });
    }

    // res.status(200).json({
    //   sussess: true,
    //   message: "Login success",
    //   data: { result, token },
    // });
  } catch (error) {
    res.status(500).json({
      sussess: false,
      message: "Account or password is incorrect",
      error: error,
    });
  }
};
