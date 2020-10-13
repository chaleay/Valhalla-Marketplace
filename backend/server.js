import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/product/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} MODE on port ${PORT}`)
);
