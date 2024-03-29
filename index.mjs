import cors from "cors";
import express from "express";
import "express-async-errors";
import "./loadEnvironment.mjs";
import brands from './routes/brands.mjs'
import products from './routes/products.mjs'
import carts from './routes/carts.mjs'

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/brands', brands);
app.use('/api/products', products)
app.use('/api/carts', carts)

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});