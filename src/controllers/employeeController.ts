import { NextFunction, Request, RequestHandler, Response } from 'express'
import Employee from '../models/employeeModel'
import { STATUS_CODE } from '../enum/enum'
import { PROFESSION } from '../enum/enum'
export const storeEmployeeData: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body.formData
        await Employee.create(data)
        res.status(STATUS_CODE.OK).json({
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
        const { profession, page } = req.query
        const employeeProfession =
            profession === PROFESSION.ALL ? {} : { profession }
        const employeeData = await Employee.find({ ...employeeProfession })
            .skip(20 * Number(page))
            .limit(20)
        let total = await Employee.countDocuments({ ...employeeProfession })
        total = total%10===0?total:(Math.ceil(total/10)*10);
        res.status(STATUS_CODE.ACCEPTED).json({
            data: { employeeData, total },
            message: 'Data received successfully',
            success: true,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteEmployeeData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await Employee.findByIdAndDelete(req.query.id)
        res.status(STATUS_CODE.NO_CONTENT).json({
            data: null,
            message: 'Employee data deleted successfully',
            success: true,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteAllEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await Employee.deleteMany()
        res.status(200)
            .json(STATUS_CODE.NO_CONTENT)
            .json({
                data: null,
                message: 'Successfully deleted all the data',
                success: true,
            })
    } catch (error) {
        next(error)
    }
}

export const updateEmployeeData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body.formData
        const updatedData = await Employee.findOneAndUpdate(
            { email: data.email },
            data,
            { returnOriginal: false }
        )
        res.status(STATUS_CODE.OK).json({
            data: updatedData,
            message: 'Data updated successfully',
            success: true,
        })
    } catch (error) {
        next(error)
    }
}
