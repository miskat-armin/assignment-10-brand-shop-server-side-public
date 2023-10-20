import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

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
    const params = req.body
    collection.insertOne({
        name: params.name,
        image: params.image,
        brand_name: params.brand_name,
        price:params.price,
        user: params.user,
        rating: params.rating,
        type: params.type
    })
    .then(result => res.status(200).send(result))
    .catch( err => res.status(500).send({error:true, message: "Error while adding to cart"}))
})


router.delete('/delete/:id', async(req, res) => {
    const collection = db.collection("carts")

   collection.deleteOne({
        _id: new ObjectId(req.params.id)
    })
    .then(result => res.status(200).send(result))
    .catch(e => res.status(500).send({error:true, message:"Cannot delete cart item"}))
})

export default router
