import mongoose, { trusted } from "mongoose";
import { userSchema } from "../user/user.schema.js";
import { postSchema } from "./post.schema.js";

import { ApplicationError } from "../../error-handler/applicationError.js";

// creating model from schema.
const UserModel = mongoose.model('User', userSchema)
const PostModel = mongoose.model('Post',postSchema)

export default class PostRepository{
    async add(postData){
        try{
            
            
            const newPost = new PostModel(postData);
            const savedPost = await newPost.save();
            return savedPost;

            
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
    async getById(postId){
        try{
            const post = await PostModel.findById(postId);
            return post;

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
    async getAll(userId){
        try{
            console.log(userId);
            const post = await PostModel.find({userId:userId});
            console.log(post);
            return post;

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
    async allPosts(){
        try{
            
            const post = await PostModel.find();
            
            return post;

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
    async update(postId,updated){
        try{
            const result= await PostModel.findByIdAndUpdate(postId,updated,{new:true});
            
            return result;
            

    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);    
    }

}
async delete(postId){
    try{
        await PostModel.findByIdAndDelete(postId);
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);    
    }
}
}