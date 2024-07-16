import { RequestHandler } from "express";
import typeCheck from "./typeCheck";
import User from "../models/userModel";
import customErrorHandler from "./customErrorHandler";
import { StatusCode } from "../enum/enum";
const validator: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body.formData;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!typeCheck(data)) {
      customErrorHandler(
        { code: StatusCode.NOT_ACCEPTABLE, message: "Fill all fields present" },
        res,
      );
    }
    if (!data.email.match(emailRegex)) {
      customErrorHandler(
        { code: StatusCode.NOT_ACCEPTABLE, message: "Email is Invalid" },
        res,
      );
    }
    const userExistence = await User.findOne({ email: data.email });
    if (userExistence) {
      customErrorHandler(
        {
          code: StatusCode.CONFLICT,
          message: "Employee already filled the form",
        },
        res,
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default validator;
