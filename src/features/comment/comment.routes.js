
import express from 'express';
import CommentController from './comment.controller.js';


// 2. Initialize Express router.
const commentRouter = express.Router();

const commentController = new CommentController();
commentRouter.post('/:postId',(req,res)=>{
    commentController.addComment(req,res);
})
commentRouter.get('/:postId',(req,res)=>{
    commentController.getComments(req,res);
})
commentRouter.put('/:commentId',(req,res)=>{
    commentController.updateComment(req,res);
})
commentRouter.delete('/:commentId',(req,res)=>{
    commentController.deleteComment(req,res);
})

export default commentRouter;
