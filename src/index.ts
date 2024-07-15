import express, { Express, NextFunction, Request, Response } from "express";
import route from './routes/userRoutes'
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./config/dbConnection";
import { ErrorInterface } from "./interface/interface";


dotenv.config();
const port: String = process.env.PORT || '3000';
dbConnection();
const app: Express = express();

app.use(express.json());
app.use(cors())

app.use("/", route);
app.use((error: ErrorInterface, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.code).json({ data: null, message: error.message})

})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
