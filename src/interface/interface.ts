import { PROFESSION, STATUS_CODE } from "../enum/enum";

export interface EmployeeData {
  name: string;
  building: string;
  profession: PROFESSION;
  city: string;
  state: string;
  pincode: string;
  phone?: string;
  email: string;
}