import express, { Express, NextFunction, Request, Response } from 'express'
import route from './routes/employeeRoutes'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnection from './config/dbConnection'
import { STATUS_CODE } from './enum/enum'

dotenv.config()
const port: String = process.env.PORT || '3000'
dbConnection()
const app: Express = express()

app.use(express.json())
app.use(cors())

app.use('/', route)
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof Error)
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            data: null,
            message: error.message,
            success: false,
        })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
