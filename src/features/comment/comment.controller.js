import CommentRepository from "./comment.repository.js"; 

export default class CommentController {

    constructor(){
      this.commentRepository = new CommentRepository();
    }

    async addComment(req,res){
        try{
            const {content} = req.body;
            const userId = req.userID;
            
            const postId = req.params.postId;
            const comment = await this.commentRepository.addComment({content,userId,postId});
            res.status(201).json(comment);

    }
    catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");
      }
}
async  getComments(req,res){
    try{
        const postId = req.params.postId;
        const comments = await this.commentRepository.getComments(postId);
        res.status(200).json(comments);

    }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");
      }
}
async updateComment(req,res){
    try{
        const commentId = req.params.commentId;
        const {content} = req.body;
        
        const updatedComment = await this.commentRepository.update(commentId,content);
        res.status(200).json(updatedComment);


    }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");
      }
}
async deleteComment(req,res){
    try{
        const commentId = req.params.commentId;
        await this.commentRepository.delete(commentId);
        res.status(200).send("comment deleted successfully");
        
    }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");
      }

}
}