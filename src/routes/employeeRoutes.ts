import {
  storeEmployeeData,
  getEmployeeData,
  deleteEmployeeData,
  updateEmployeeData,
  deleteAllEmployee,
} from "../controllers/employeeController";
import validator from "../middleware/employeeDetailValidation";

import { Router } from "express";

const router = Router();

router.post("/save-employee-data", validator, storeEmployeeData);

router.get("/get-employee-data", getEmployeeData);

router.put("/update-employee-data", updateEmployeeData);

router.delete("/delete-employee-data", deleteEmployeeData);

router.delete("/delete-all-employee", deleteAllEmployee);

export default router;
