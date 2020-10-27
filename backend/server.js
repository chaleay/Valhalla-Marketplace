//we converted from common js syntax to es6 syntax - need to go package.json and add type:true
//see documentation for more details
import path from 'path';
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
//importing functions that we exported from middleware/errormiddleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// /api/prodcuts
app.use('/api/products', productRoutes);
// /api/users/login
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

//paypal endpoint for fetching client ID
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
//need to make upload folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//HANDLE PRODUCTION
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}
//HANDLE PROD END

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
