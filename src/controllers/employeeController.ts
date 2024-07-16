import { NextFunction, Request, RequestHandler, Response } from 'express'
import Employee from '../models/employeeModel'
import { StatusCode } from '../enum/enum'
import { Profession } from '../enum/enum'
export const storeEmployeeData: RequestHandler = async (req, res, next) => {
  try {
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
    const { profession, page , limit } = req.query
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

export const deleteEmployeeData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Employee.findByIdAndDelete(req.query.id)
    res.status(StatusCode.NO_CONTENT).json({
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
    res.status(StatusCode.NO_CONTENT)
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
    const { email } = req.body.formData
    const updatedData = await Employee.findOneAndUpdate(
      { email: email },
      req.body.formData,
      { returnOriginal: false }
    )
    res.status(StatusCode.OK).json({
      data: updatedData,
      message: 'Data updated successfully',
      success: true,
    })
  } catch (error) {
    next(error)
  }
}
