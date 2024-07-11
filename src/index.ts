import express, { Express, NextFunction, Request, Response } from "express";
import route from './routes/route'
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./config/dbConnection";


dotenv.config();
const port : String = process.env.PORT || '3000';
dbConnection();
const app: Express = express();

app.use(express.json());
app.use(cors())

app.use("/", route);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error)
    res.status(404).json({ data: null, message: error.message })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
