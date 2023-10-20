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
        brand_name: req.params.brand_name
    }).toArray()

    res.send(result).status(200)
})


router.post('/update/:brand/:product', async(req, res) => {
    const collection = db.collection("products")
    const params = req.body;
    collection.updateOne(
        {brand_name: req.params.brand, name: req.params.product},
        {$set: {
            name: params.name,
            image: params.image,
            brand_name: params.brand_name,
            type: params.type,
            price: params.price,
            description: params.description,
            rating: params.rating
        }}
    )
    .then(result => res.status(200).send(result))
    .catch(e => res.status(500).send({error: true, message: "Failed to update"}))


})


router.post('/add_product', async(req, res) => {
    const collection = db.collection("products")
    const params = req.body;

    collection.countDocuments({name: req.body.name, brand_name: req.body.brand_name}, {limit:1})
    .then(async(result) => {
        if(result <= 0){
            const insertedData = await collection.insertOne(params);
            res.status(200).send(insertedData)
        }
        else{
            res.status(500).send({error: true, message:"Product already exits"})
        }
    })
   
})


router.get('/:brand/:product', async(req, res) => {
    console.log(req.params.product)
    const collection = db.collection("products")
    const result = await collection.findOne({
        brand_name: req.params.brand,
        name: req.params.product
    })


    res.send(result).status(200);
})


export default router
