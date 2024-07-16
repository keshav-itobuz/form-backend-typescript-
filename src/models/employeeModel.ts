import mongoose from 'mongoose'
import { PROFESSION } from '../enum/enum'
import { EmployeeData } from '../interface/interface'
const { Schema } = mongoose

const employeeSchema = new Schema<EmployeeData>(
    {
        name: {
            type: String,
            required: true,
        },
        profession: {
            type: String,
            enum: PROFESSION,
        },
        building: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const Employee = mongoose.model('employee', employeeSchema)
export default Employee
