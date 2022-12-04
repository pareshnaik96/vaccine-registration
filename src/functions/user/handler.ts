import express from "express";
import serverless from 'serverless-http';
import { createUser, login } from "./Controllers/userController";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
const app = express()

app.use(express.json());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://pareshnaik:pareshruno@cluster0.pithhzr.mongodb.net/Vaccine-DB?retryWrites=true&w=majority")
  .then(() => console.log("MongoDb is connected"))
  .catch(err => console.log(err))

app.post('/register', createUser)

app.post('/login', login)


export const main = serverless(app);
