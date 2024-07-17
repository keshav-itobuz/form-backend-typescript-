import mongoose from 'mongoose'
import { Profession } from '../enum/enum'
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
            enum: Profession,
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
            unique:true,
        },
    },
    { timestamps: true }
)

export default mongoose.model('employee', employeeSchema)
