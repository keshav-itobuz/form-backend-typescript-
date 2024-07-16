import { StatusCode } from '../enum/enum'
import { Response } from 'express'

export default function customErrorHandler({
    code,
    message,
    res,
}: {
    code: StatusCode
    message: string
    res: Response
}) {
    res.status(code).json({ data: null, message, success: false })
}
