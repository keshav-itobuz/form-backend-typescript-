import { storeData, getData, deleteData, updateData, deleteAll } from "../controllers/userController";
import validator from "../middleware/validation";

import { Router } from "express";

const router = Router();

router.post('/saveData', validator, storeData)

router.get('/getData', getData)

router.put('/updateData', updateData)

router.delete('/deleteData', deleteData)

router.delete('/deleteAll', deleteAll)

export default router