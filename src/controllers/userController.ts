import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../models/userModel";
import typeCheck from "../middleware/typeCheck";
export const storeData: RequestHandler = async (req, res, next) => {
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
        const userData = new User(data);
        await userData.save();
        res.status(200).json({ data: null, message: "success" });
    }
    catch (error) {
        next(error)
    }
}

export const getData: RequestHandler = async (req, res, next) => {
    try {
        const { profession, page } = req.query;
        let userData, total;
        if (profession === 'all') {
            userData = await User.find().skip(10 * Number(page)).limit(10);
            total = await User.countDocuments()
        }
        else {
            userData = await User.find({ profession }).skip(8 * Number(page)).limit(8);
            total = await User.countDocuments({ profession })
        }
        total=Math.ceil(total/10)
        res.status(200).json({ data: { userData, total }, message: "success" })
    }
    catch (error) {
        next(error);
    }
}

export const deleteData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.findByIdAndDelete(req.query.id);
        res.status(200).json({ data: null, message: "success" })
    }
    catch (error) {
        next(error);
    }
}

export const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.deleteMany();
        res.status(200).json({ data: null, message: "success" })
    }
    catch (error) {
        next(error);
    }
}

export const updateData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body.formData;
        const updatedData = await User.findOneAndUpdate({ email: data.email }, data, { returnOriginal: false })
        res.status(200).json({ data: updatedData, message: "success" })
    }
    catch (error) {
        next(error);
    }
}