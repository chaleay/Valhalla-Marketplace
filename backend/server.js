//we converted from common js syntax to es6 syntax - need to go package.json and add type:true
//see documentation for more details
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
//importing functions that we exported from middleware/errormiddleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);

//Custom error handling
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} MODE on port ${PORT}`.green.bold
  )
);
