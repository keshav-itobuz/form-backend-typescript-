import * as yup from 'yup'
import { Profession } from '../enum/enum'

const employeeSchema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .trim()
        .min(2, 'Minimum 2 characters required'),
    phone: yup.string().max(10, 'Phone number must be at most 10 characters'),
    building: yup.string().required('Building is required'),
    profession: yup
        .mixed<Profession>()
        .oneOf(Object.values(Profession), 'Invalid profession'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pincode: yup
        .string()
        .required('Pincode is required')
        .min(6, 'Invalid Pincode')
        .max(6, 'Invalid Pincode'),
    email: yup.string().email('Invalid email').required('Email is required'),
})

export default employeeSchema
