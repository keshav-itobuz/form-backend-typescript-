import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../modals/modal";
import typeCheck from "../middleware/middleware";
export const storeData: RequestHandler = async (req, res, next) => {
    try {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!typeCheck(req.body)) {
            throw new Error('Fill all fields present');
        }
        if(!req.body.email.match(emailRegex)){
            throw new Error('Email is not valid');
        }
        const userExistence = await User.findOne({email:req.body.email});
        if(userExistence){
            throw new Error('User already Filled the form')
        }
        const userData = new User({
            ...req.body,
            name:req.body.name.toLowerCase()
        }
        );
        await userData.save();
        res.status(200).json({ data: null, message: "success" });
    }
    catch (error) {
        next(error)
    }
}

export const getData: RequestHandler = async (req, res, next) => {
    try {
        const userData = await User.find();
        res.status(200).json({ data: userData, message: "success" })
    }
    catch (error) {
        next(error);
    }
}

export const deleteData = async (req: Request, res: Response , next:NextFunction) => {
    try {
        await User.findByIdAndDelete(req.query.id);
        res.status(200).json({ data: null, message: "success" })
    }
    catch (error) {
        next(error);
    }
}

export const updateData = async (req: Request, res: Response , next:NextFunction) =>{
    try {
        const updatedData = await User.findOneAndUpdate({email:req.body.email},req.body,{returnOriginal:true})
        res.status(200).json({ data: updateData, message: "success" })
    }
    catch (error) {
        next(error);
    }
}