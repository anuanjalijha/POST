import mongoose from 'mongoose';
import { commentSchema } from './comment.schema.js';
import { ApplicationError } from '../../error-handler/applicationError.js';

const commentModel = mongoose.model('Comment',commentSchema);
export default class CommentRepository{
    async addComment(comments){
        try{
            const newComment = new commentModel(comments);
            return await newComment.save();

    }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
    async getComments(postId){
        try{
            return await commentModel.find({postId: postId});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }

    }
    async update(commentId,content){
        try{
            return await commentModel.findByIdAndUpdate(commentId,{content:content},{new:true});
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
    async delete(commentId){
        try{
            await commentModel.findByIdAndDelete(commentId);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
    
}

