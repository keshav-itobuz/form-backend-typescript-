export interface UserData {
    name: string,
    building: string,
    city: string,
    state: string,
    pincode: string
    phone: string,
    email: string

}
const typeCheck = (data: UserData) => {
    if (data.name && data.building && data.city && data.state && data.email && data.pincode)
        return true;
    return false;
}
export default typeCheck;