import { RequestHandler } from 'express'
import Employee from '../models/employeeModel'
import { StatusCode } from '../enum/enum'
import { Profession } from '../enum/enum'
import mongoose from 'mongoose'
import employeeSchema from '../validator/employeeValidation'

export const getEmployee: RequestHandler = async (req, res, next) => {
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

export const deleteEmployee: RequestHandler = async (req, res, next) => {
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

    const deletedData = await Employee.deleteMany({})
    res.status(StatusCode.NO_CONTENT).json({
      data: null,
      message: 'Successfully deleted all the data',
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export const createUpdateEmployee: RequestHandler = async (req, res, next) => {
  try {
    const validate = employeeSchema.safeParse(req.body.employeeData)
    if (!validate.success) {
      throw new Error(validate?.error?.errors[0]?.message)
      return;
    }
    const { email, _id } = req.body.employeeData
    const duplicateEntry = await Employee.findOne({ email })
    if (duplicateEntry && !duplicateEntry._id.equals(_id)) {
      throw new Error('Duplicate email')
    }
    req.body.employeeData._id = _id ? _id : new mongoose.Types.ObjectId()
    const updatedData = await Employee.findByIdAndUpdate(
      req.body.employeeData._id,
      req.body.employeeData,
      { upsert: true, returnOriginal: false }
    )
    res.status(StatusCode.OK).json({
      data: null,
      message: updatedData
        ? 'Data uploaed successfully'
        : 'Data updated successfully',
      success: true,
    })
  } catch (error) {
    next(error)
  }
}
