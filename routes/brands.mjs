import express from "express";
import db from "../db/conn.mjs";


const router = express.Router();

router.get('/', async(req, res) => {
    const collection = db.collection("brands")
    const result = await collection.find({}).toArray()

    res.send(result).status(200)
})

export default router
