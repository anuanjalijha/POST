// 1. Import Exprerss
import express from 'express';
import dotenv from 'dotenv';

import postRouter from './src/features/post/post.routes.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
// import cartRouter from './src/features/cartItems/cartItems.routes.js';

import { ApplicationError } from './src/error-handler/applicationError.js';
// import orderRouter from './src/features/order/order.routes.js';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import mongoose from 'mongoose';
// import likeRouter from './src/features/like/like.routes.js';

// 2. Create Server
const server = express();
dotenv.config();



server.use(express.json());
server.use('/api/users',userRouter);
server.use('/api/posts',jwtAuth,postRouter);
// Bearer <token>
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products


// 3. Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to Ecommerce APIs');
});
// Error handler middleware
// Error handler middleware
server.use((err, req, res, next) => {
  console.log(err);
  if(err instanceof mongoose.Error.ValidationError){
    return res.status(400).send(err.message);
  }
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }

  // server errors.
  res
  .status(500)
  .send(
    'Something went wrong, please try later'
    );
});


// 4. Middleware to handle 404 requests.
server.use((req, res)=>{
  res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs")
});


// 5. Specify port.
server.listen(8000, ()=>{
  console.log('Server is running at 8000');
  // connectToMongoDB();
  connectUsingMongoose();

});
