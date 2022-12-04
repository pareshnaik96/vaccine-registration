import express, { Request, Response } from "express";
import serverless from 'serverless-http';
import bodyParser from "body-parser";
import cors from 'cors'

const app = express()
app.use(bodyParser.json());
app.use(cors())

app.post('/test', async (_req: Request, res: Response) => {
  console.log('hiiiiiiiii')
  console.log(_req.body)
  res.send('Hello World!')
})

export const main = serverless(app);
