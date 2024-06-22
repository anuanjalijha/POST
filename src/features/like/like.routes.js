
import express from 'express';
import { LikeController } from './like.controller.js';


// 2. Initialize Express router.
const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get('/:id',(req,res)=>{
    likeController.getLikes(req,res);

})
likeRouter.get('/toggle/:id',(req,res)=>{
    likeController.likeItem(req,res);
})
export default likeRouter;