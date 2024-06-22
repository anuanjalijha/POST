import { LikeRepository } from "./like.repository.js";


export class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async getLikes(req, res, next){
        try{
            const {id} = req.params;
            console.log(id);
            const likes = await this.likeRepository.getLikes(id);
            return res.status(200).send(likes)
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
    }

    async likeItem(req, res){
        try{
            const {type} = req.query;
            const {id} = req.params;
            if(type!='Post' && type!='Comment'){
                return res.status(400).send("Invalid");
            }
            if(type=='Post'){
                await this.likeRepository.togglePost(req.userID, id);
            }else{
                await this.likeRepository.toggleComment(req.userID, id);    
            }
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
          res.status(201).send("liked item sucessfully");
    }
}