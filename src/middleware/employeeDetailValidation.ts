import { RequestHandler } from 'express'
import Employee from '../models/employeeModel'
import customErrorHandler from '../helper/customErrorHandler'
import { STATUS_CODE } from '../enum/enum'

const validator: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body.formData
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (
            !(
                data.name &&
                data.building &&
                data.city &&
                data.state &&
                data.email &&
                data.pincode
            )
        ) {
            customErrorHandler({
                code: STATUS_CODE.NOT_ACCEPTABLE,
                message: 'Fill all fields present',
                res,
            })
            return
        }
        if (!data.email.match(emailRegex)) {
            customErrorHandler({
                code: STATUS_CODE.NOT_ACCEPTABLE,
                message: 'Email is Invalid',
                res,
            })
            return
        }
        const userExistence = await Employee.findOne({ email: data.email })
        if (userExistence) {
            customErrorHandler({
                code: STATUS_CODE.CONFLICT,
                message: 'Employee already filled the form',
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
