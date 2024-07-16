import {
    storeEmployeeData,
    getEmployeeData,
    deleteEmployeeData,
    updateEmployeeData,
    deleteAllEmployee,
} from '../controllers/employeeController'
import validator from '../middleware/employeeDetailValidation'

import { Router } from 'express'

const router = Router()

router.post('/send-employee', validator, storeEmployeeData)

router.get('/get-employee', getEmployeeData)

router.put('/update-employee', validator, updateEmployeeData)

router.delete('/delete-employee', deleteEmployeeData)

router.delete('/delete-all-employee', deleteAllEmployee)

export default router
