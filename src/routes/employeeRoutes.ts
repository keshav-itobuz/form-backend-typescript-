import {
    getEmployeeData,
    deleteEmployeeData,
    createUpdateEmployeeData,
    deleteAllEmployee,
} from '../controllers/employeeController'
import validator from '../middleware/employeeDetailValidation'

import { Router } from 'express'

const router = Router()

router.get('/get-employee', getEmployeeData)

router.post('/create-update-employee', validator, createUpdateEmployeeData)

router.delete('/delete-employee', deleteEmployeeData)

router.delete('/delete-all-employee', deleteAllEmployee)

export default router
