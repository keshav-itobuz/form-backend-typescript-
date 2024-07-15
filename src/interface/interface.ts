import { Profession } from "../enum/enum"

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
    code: number,
    message: {
        Error: Error
    }

}