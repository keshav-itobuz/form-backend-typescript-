import {
    getEmployeeData,
    deleteEmployeeData,
    createUpdateEmployeeData,
} from '../controllers/employeeController'
import validator from '../middleware/employeeDetailValidation'

import { Router } from 'express'

const router = Router()

router.get('/get-employee', getEmployeeData)

router.post('/create-update-employee', validator, createUpdateEmployeeData)

router.delete('/delete-employee', deleteEmployeeData)

export default router
