import { ErrorInterface } from "../interface/interface";
import { Response } from "express";

export default function customErrorHandler(error:ErrorInterface , res:Response){
    res.status(error.code).json({ data: null, message: error.message })
}