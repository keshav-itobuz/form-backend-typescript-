import { RequestHandler } from 'express'
import Employee from '../models/employeeModel'
import { StatusCode } from '../enum/enum'
import { Profession } from '../enum/enum'
import customErrorHandler from '../helper/customErrorHandler'

export const storeEmployeeData: RequestHandler = async (req, res, next) => {
    try {
        const { email } = req.body.formData
        const userExistence = await Employee.findOne({ email })
        if (userExistence) {
            customErrorHandler({
                code: StatusCode.CONFLICT,
                message: 'Employee already filled the form',
                res,
            })
            return
        }
        delete req.body.formData['_id']
        await Employee.create(req.body.formData)
        res.status(StatusCode.OK).json({
            data: null,
            message: 'successfully stored the data',
            success: true,
        })
    } catch (error) {
        next(error)
    }
}

export const getEmployeeData: RequestHandler = async (req, res, next) => {
    try {
        const { profession, page, limit } = req.query
        const employeeProfession =
            profession === Profession.ALL ? {} : { profession }
        const employeeData = await Employee.find(employeeProfession)
            .skip(10 * Number(page))
            .limit(Number(limit))
        let total = await Employee.countDocuments(employeeProfession)
        res.status(StatusCode.ACCEPTED).json({
            data: { employeeData, total },
            message: 'Data received successfully',
            success: true,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteEmployeeData: RequestHandler = async (req, res, next) => {
    try {
        const deletedData = await Employee.findByIdAndDelete(req.query.id)
        res.status(StatusCode.OK).json({
            data: null,
            message: deletedData
                ? 'Employee data deleted successfully'
                : 'No such record exist please check the id',
            success: true,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteAllEmployee: RequestHandler = async (req, res, next) => {
    try {
        await Employee.deleteMany()
        res.status(StatusCode.NO_CONTENT).json({
            data: null,
            message: 'Successfully deleted all the data',
            success: true,
        })
    } catch (error) {
        next(error)
    }
}

export const updateEmployeeData: RequestHandler = async (req, res, next) => {
    try {
        const { email, _id } = req.body.formData
        const duplicateEntry = await Employee.findOne({ email })
        if (duplicateEntry && !duplicateEntry._id.equals(_id)) {
            throw new Error('Duplicate email')
        }
        const updatedData = await Employee.findByIdAndUpdate(
            _id,
            req.body.formData,
            { returnOriginal: false }
        )
        res.status(StatusCode.OK).json({
            data: null,
            message: updatedData
                ? 'No such record exist please check the email'
                : 'Data updated successfully',
            success: true,
        })
    } catch (error) {
        next(error)
    }
}
