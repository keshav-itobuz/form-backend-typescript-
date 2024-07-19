import {
    getEmployee,
    deleteEmployee,
    createUpdateEmployee,
} from '../controllers/employeeController'
import validator from '../middleware/employeeDetailValidation'

import { Router } from 'express'

const router = Router()

router.get('/get-employee', getEmployee)

router.post('/create-update-employee', validator, createUpdateEmployee)

router.delete('/delete-employee', deleteEmployee)


export default router
