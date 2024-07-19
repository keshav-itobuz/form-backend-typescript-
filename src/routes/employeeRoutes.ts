import {
    getEmployee,
    deleteEmployee,
    createUpdateEmployee,
    deleteAllEmployee,
} from '../controllers/employeeController'
import validator from '../middleware/employeeDetailValidation'

import { Router } from 'express'

const router = Router()

router.get('/get-employee', getEmployee)

router.post('/create-update-employee', validator, createUpdateEmployee)

router.delete('/delete-employee', deleteEmployee)

router.delete('/delete-all-employee', deleteAllEmployee)

export default router
