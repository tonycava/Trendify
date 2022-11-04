import express from "express";
import { fetchData, fetchId, fetchDate } from "./api.controller";
import { checkIdMiddleware, checkHeader } from "./api.middleware";
const router = express.Router()

router.get('/', checkHeader, fetchData)
router.get('/date', checkHeader, fetchDate)
router.get('/:id', checkIdMiddleware, checkHeader, fetchId)

export default router