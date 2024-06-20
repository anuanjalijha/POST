import express from 'express';
import PostController from './post.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

// 2. Initialize Express router.
const postRouter = express.Router();

const postController = new PostController();

// All the paths to controller methods.
// localhost/api/products

// localhost:4100/api/products/filter?minPrice=10&maxPrice=20&category=Category1
// productRouter.get(
//   '/',
//   (req, res)=>{
//     productController.getAllProducts(req, res)
// } 
// );
postRouter.post(
  '/',
  upload.single('imageUrl'),
  (req, res)=>{
    postController.addPost(req, res)
} 
);
postRouter.get('/all',(req,res)=>{
  postController.allPosts(req,res)
})

postRouter.get('/:postId',(req,res)=>{
  postController.getPostById(req,res)
})
postRouter.get('/',(req,res)=>{
  postController.getAllPosts(req,res)
})
postRouter.put('/:postId',upload.single('imageUrl'),(req,res)=>{
  postController.updatePost(req,res)
})
postRouter.delete('/:postId',(req,res)=>{
  postController.deletePost(req,res)
})

// productRouter.get(
//   '/:id',
//   (req, res)=>{
//     productController.getOneProduct(req, res)
// } );




export default postRouter;
