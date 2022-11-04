import { Request, Response } from "express";
import { sendJSON, sendJSONById, sendDate } from "./api.service";

export const fetchData = async (req: Request, res: Response) => {
  const result = await sendJSON()
  res.json(result)
}

export const fetchId = async (req: Request, res: Response) => {
  const { id } = req.params
  const resultOne = await sendJSONById(id)
  const result = resultOne.length > 0 ? resultOne : 'Id out of range'
  res.json(result)
}

export const fetchDate = async (req: Request, res: Response) => {
  const result = sendDate()
  res.json(result)
}