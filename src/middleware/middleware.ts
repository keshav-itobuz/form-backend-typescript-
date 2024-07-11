export interface UserData {
    name: string,
    address: string,
    phone: string,
    email: string,

}
const typeCheck = (data: UserData) => {
    if (data.name && data.address && data.email && data.address)
        return true;
    return false;
}
export default typeCheck;