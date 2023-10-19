import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";


const router = express.Router();

router.get('/', async(req, res) => {
    const collection = db.collection("products")
    const result = await collection.find({}).toArray()

    res.send(result).status(200)
})


router.get('/:brand_name', async(req, res) => {
    const collection = db.collection("products")
    const result = await collection.find({
        brand_name: req.query.brand_name
    }).toArray()

    res.send(result).status(200)
})


router.post('/add_product', async(req, res) => {
    const collection = db.collection("products")
    const params = req.body;
    const result = await collection.insertOne(params)
    console.log(result)
    res.status(200).send(result)
})




export default router
