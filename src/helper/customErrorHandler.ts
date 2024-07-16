import { STATUS_CODE } from "../enum/enum";
import { Response } from "express";

export default function customErrorHandler({ code, message, res }: { code: STATUS_CODE, message: string, res: Response }) {
    res.status(code).json({ data: null, message, success: false });
}
