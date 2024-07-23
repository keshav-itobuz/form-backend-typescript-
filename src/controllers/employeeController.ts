import { RequestHandler } from 'express'
import Employee from '../models/employeeModel'
import { StatusCode } from '../enum/enum'
import { Profession } from '../enum/enum'
import mongoose from 'mongoose'
import employeeSchema from '../validator/employeeValidation'

class employeeClass {

  public getEmployee: RequestHandler = async (req, res, next) => {
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


  public deleteEmployee: RequestHandler = async (req, res, next) => {
    try {
      const _id = req.query.id ? { _id: req.query.id } : {};
      const deletedData = await Employee.deleteMany(_id)
      res.status(StatusCode.NO_CONTENT).json({
        data: null,
        message: 'Successfully deleted all the data',
        success: true,
      })
    } catch (error) {
      next(error)
    }
  }

  public createUpdateEmployee: RequestHandler = async (req, res, next) => {
    try {
      const validate = employeeSchema.safeParse(req.body.employeeData)
      if (!validate.success) {
        throw new Error(validate?.error?.errors[0]?.message)
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
          ? 'Data updated successfully'
          : 'Data uploaded successfully',
        success: true,
      })
    } catch (error) {
      next(error)
    }
  }
}
export const employeeOperations = new employeeClass()