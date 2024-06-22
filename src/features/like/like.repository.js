import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";

const LikeModel = mongoose.model("Like", likeSchema);

export class LikeRepository {
    async getLikes(id) {
        return await LikeModel.find({
            likeable: new ObjectId(id),
        }).populate('user').populate('likeable');
    }

    async togglePost(userId, postId) {
        try {
            const like = await LikeModel.findOne({
                user: new ObjectId(userId),
                likeable: new ObjectId(postId),
                on_model: 'Post'
            });

            if (!like) {
                const newLike = new LikeModel({
                    user: new ObjectId(userId),
                    likeable: new ObjectId(postId),
                    on_model: 'Post'
                });
                await newLike.save();
            } else {
                await LikeModel.deleteOne({
                    user: new ObjectId(userId),
                    likeable: new ObjectId(postId),
                    on_model: 'Post'
                });
            }
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    async toggleComment(userId, commentId) {
        try {
            const like = await LikeModel.findOne({
                user: new ObjectId(userId),
                likeable: new ObjectId(commentId),
                on_model: 'Comment'
            });
            console.log(like);

            if (!like) {
                const newLike = new LikeModel({
                    user: new ObjectId(userId),
                    likeable: new ObjectId(commentId),
                    on_model: 'Comment'
                });
                await newLike.save();
            } else {
                await LikeModel.deleteOne({
                    user: new ObjectId(userId),
                    likeable: new ObjectId(commentId),
                    on_model: 'Comment'
                });
            }
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }
}
