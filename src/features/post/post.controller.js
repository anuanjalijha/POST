import jwt from 'jsonwebtoken';
import PostRepository from './post.repository.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


export default class PostController {

  constructor(){
    this.postRepository = new PostRepository();
  }
  async addPost(req, res) {
    try{
  
    const { caption } = req.body;
    const imageUrl = req.file ? req.file.filename : null;

      if (!imageUrl) {
        return res.status(400).send("Image is required");
      }
      const userId = req.userID;

    console.log(imageUrl);
    const newPost = {caption,imageUrl,userId
    
    };
    const createdPost = await this.postRepository.add(newPost);
    res.status(201).send(createdPost);
  }catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
  }
  async getPostById(req,res){
    try{
      const postId = req.params.postId;
      const post = await this.postRepository.getById(postId);
      if (!post) {
        return res.status(404).send("Post not found");
        }
        res.status(200).send(post);


    }catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }


  }
  async getAllPosts(req,res){
    try{
     const  userId  = req.userID;
      const posts = await this.postRepository.getAll(userId);
      res.status(200).send(posts);

  }
  catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
}
async allPosts(req,res){
  try{
    
     const posts = await this.postRepository.allPosts();
     res.status(200).send(posts);

 }
 catch(err){
   console.log(err);
   return res.status(200).send("Something went wrong");
 }


}
async updatePost(req,res){
  try{
    const postId = req.params.postId;
    const {caption }= req.body;
    // const imageUrl= req.file ? req.file.filename : null;
    const imageUrl = req.file.filename;
    console.log(imageUrl);
    // console.log(postId)
    console.log(caption)
    const updatedData = {caption,imageUrl}
    const post = await this.postRepository.update(postId,updatedData);
    res.status(200).send(post);
  }
  catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }

}
async deletePost(req,res){
  try{
    const postId = req.params.postId;
    await this.postRepository.delete(postId);
    res.status(200).send("Post deleted successfully");
  }
  catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
}
}