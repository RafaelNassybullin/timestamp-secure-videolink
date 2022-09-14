import express, { Request } from "express";
import mongoose from "mongoose";
import router from "./router";
import { MONGO_OPTIONS } from "./config";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

const PORT = process.env["PORT"] || 8080;
const DB_URL = process.env["DB_URL"] || "mongodb+srv://rafael:rafael@cluster0.ksvub.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(cors<Request>());
app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(DB_URL, MONGO_OPTIONS);
    app.listen(PORT, () =>
      console.log("DEV SERVER IS SUCCESSFULLY STARTED :)")
    );
  } catch (e) {
    console.log(e);
  }
};

start();