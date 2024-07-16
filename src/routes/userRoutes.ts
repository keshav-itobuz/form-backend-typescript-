import {
  storeEmployeeData,
  getEmployeeData,
  deleteEmployeeData,
  updateEmployeeData,
  deleteAllEmployee,
} from "../controllers/userController";
import validator from "../middleware/validation";

import { Router } from "express";

const router = Router();

router.post("/save-data", validator, storeEmployeeData);

router.get("/get-data", getEmployeeData);

router.put("/update-data", updateEmployeeData);

router.delete("/delete-data", deleteEmployeeData);

router.delete("/delete-all", deleteAllEmployee);

export default router;
