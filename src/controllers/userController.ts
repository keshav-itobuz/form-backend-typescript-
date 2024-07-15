import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../models/userModel";
import { StatusCode } from "../enum/enum";
import { Profession } from "../enum/enum";
export const storeData: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body.formData;
        await User.create(data);
        res.status(200).json({ data: null, message: "success" });
    }
    catch (error) {
        if(error instanceof Error)
            next({ code: StatusCode["Internal Server Error"], message: error.message});
    }
}

export const getData: RequestHandler = async (req, res, next) => {
    try {
        const { profession, page } = req.query;
        const employeeProfession = profession === Profession.ALL ? {} : { profession };
        const userData = await User.find({ ...employeeProfession }).skip(10 * Number(page)).limit(10);
        let total = await User.countDocuments({ ...employeeProfession })
        total = Math.ceil(total / 10)
        res.status(StatusCode.Accepted).json({ data: { userData, total }, message: "Data received successfully" })
    }
    catch (error) {
        if(error instanceof Error)
            next({ code: StatusCode["Internal Server Error"], message: error.message});
    }
}

export const deleteData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.findByIdAndDelete(req.query.id);
        res.status(StatusCode["No Content"]).json({ data: null, message: "Employee data deleted successfully" })
    }
    catch (error) {
        if(error instanceof Error)
            next({ code: StatusCode["Bad Request"], message: error.message});
    }
}

export const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.deleteMany();
        res.status(200).json(StatusCode["No Content"]).json({ data: null, message: "Successfully deleted all the data" })
    }
    catch (error) {
        if(error instanceof Error)
            next({ code: StatusCode["Internal Server Error"], message: error.message});
    }
}

export const updateData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body.formData;
        const updatedData = await User.findOneAndUpdate({ email: data.email }, data, { returnOriginal: false })
        res.status(StatusCode.OK).json({ data: updatedData, message: "Data updated successfully" })
    }
    catch (error) {
        if(error instanceof Error)
            next({ code: StatusCode["Not Modified"], message: error.message});
    }
}