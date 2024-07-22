import { employeeOperations } from '../controllers/employeeController'
import validator from '../middleware/employeeDetailValidation'

import { Router } from 'express'

const router = Router()

router.get('/get-employee', employeeOperations.getEmployee)

router.post('/create-update-employee', validator, employeeOperations.createUpdateEmployee)

router.delete('/delete-employee', employeeOperations.deleteEmployee)


export default router
