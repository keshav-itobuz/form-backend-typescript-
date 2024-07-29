import { Profession } from '../enum/enum'

export interface EmployeeData {
    name: string
    building: string
    profession: Profession
    city: string
    state: string
    pincode: number
    phone?: number
    email: string
}
