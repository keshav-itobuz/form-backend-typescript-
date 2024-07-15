import { UserData } from "../interface/interface";
const typeCheck = (data: UserData) => {
    return (data.name && data.building && data.city && data.state && data.email && data.pincode)

}
export default typeCheck;