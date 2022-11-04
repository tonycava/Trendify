import express, { Request, Response } from 'express';
import schedule from 'node-schedule'
import cors from "cors"

import { errorHandlerMiddleware } from "./api/api.middleware";
import { launchTwitchBot } from './CrawlerBot/bot.main'

import apiRouter from "./api/routeur.api";

schedule.scheduleJob('0 * * * *', async () => {
  console.log("is starting")
  await launchTwitchBot()
  console.log("is done")
})

const app = express();

app.use(express.json())
app.use(cors())

app.use("/api", apiRouter)


app.use(errorHandlerMiddleware)

app.listen(3001, () => console.log('Server Running'));