import express from "express";
import db from "../db/conn.mjs";


const router = express.Router();

router.get('/', async(req, res) => {
    const collection = db.collection("carts")
    const result = await collection.find({}).toArray()

    res.send(result).status(200)
})

router.get('/:user', async(req, res) => {
    const params = req.params.user
    const collection = db.collection("carts")
    const result = await collection.find({ user: params }).toArray()
    res.send(result).status(200)
})


router.post('/addToCart', async (req, res) => {
    const collection = db.collection("carts")
    collection.insertOne(req.body)
    .then(result => res.status(200).send(result))
    .catch( err => res.status(500).send({error:true, message: "Error while adding to cart"}))
})


export default router
