import { Profession, StatusCode } from "../enum/enum"

export interface UserData {
    name: string,
    building: string,
    profession: Profession,
    city: string,
    state: string,
    pincode: string
    phone?: string,
    email: string

}
export interface ErrorInterface {
    code: StatusCode,
    message: string

}