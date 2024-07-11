import {storeData , getData , deleteData , updateData} from "../controllers/controller";

import { Router } from "express";

const router = Router();

router.post('/saveData' , storeData)

router.get('/getData' , getData)

router.put('/updateData' , updateData)

router.delete('/deleteData' , deleteData)

export default router