import { employeeOperations } from '../controllers/employeeController'

import { Router } from 'express'

const router = Router()

router.get('/get-employee', employeeOperations.getEmployee)

router.post('/create-update-employee', employeeOperations.createUpdateEmployee)

router.delete('/delete-employee', employeeOperations.deleteEmployee)

export default router
