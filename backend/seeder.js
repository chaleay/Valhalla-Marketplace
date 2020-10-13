import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

//data we are seeding/adding to db
import users from './data/users.js';
import products from './data/products.js';

//schemas
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

//db connection
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    //delete data that is already in db
    //wait for these to finish with await keyword
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      //usinf the spread operator, we add the adminUser
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    //delete data that is already in db
    //wait for these to finish with await keyword
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

//run using node command
//i.e node backend/seeder -d
if (process.argv[2] == '-d') {
  deleteData();
} else {
  importData();
}
