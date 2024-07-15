import { RequestHandler } from "express";
import typeCheck from "./typeCheck";
import User from "../models/userModel";
import { StatusCode } from "../enum/enum";
const validator: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body.formData;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!typeCheck(data)) {
            throw new Error('Fill all fields present');
        }
        if (!data.email.match(emailRegex)) {
            throw new Error('Email is not valid');
        }
        const userExistence = await User.findOne({ email: data.email });
        if (userExistence) {
            throw new Error('User already Filled the form')
        }
        next();
    }
    catch (error) {
        if(error instanceof Error && error.message.includes('already filled'))
            next({ code: StatusCode.Conflict, message: error.message});
        if(error instanceof Error)
            next({ code: StatusCode["Unprocessable Content"], message: error.message});
    }
}
export default validator;