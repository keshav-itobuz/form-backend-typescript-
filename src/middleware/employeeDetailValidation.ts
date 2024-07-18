import { RequestHandler } from 'express'
import Employee from '../models/employeeModel'
import customErrorHandler from '../helper/customErrorHandler'
import { StatusCode } from '../enum/enum'

const validator: RequestHandler = async (req, res, next) => {
    try {
        const { name, email, building, city, state, pincode } =
            req.body.employeeDetail
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!(name && building && city && state && email && pincode)) {
            customErrorHandler({
                code: StatusCode.NOT_ACCEPTABLE,
                message: 'Fill all fields present',
                res,
            })
            return
        }
        if (!email.match(emailRegex)) {
            customErrorHandler({
                code: StatusCode.NOT_ACCEPTABLE,
                message: 'Email is Invalid',
                res,
            })
            return
        }
        next()
    } catch (error) {
        next(error)
    }
}
export default validator
