import express from "express";
import { connectDB } from "./config/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
connectDB();

const app = express();
app.use(cors());

//Routes
import userRouter from "./router/user.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
