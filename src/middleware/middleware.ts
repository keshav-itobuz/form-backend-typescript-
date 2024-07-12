import { UserData } from "../interface/iterface";
const typeCheck = (data: UserData) => {
    if (data.name && data.building && data.city && data.state && data.email && data.pincode)
        return true;
    return false;
}
export default typeCheck;