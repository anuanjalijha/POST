import mongoose from "mongoose";
import { friendSchema } from "./friendship.schema.js";
import { userSchema } from "../user/user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const FriendModel = mongoose.model("Friend", friendSchema);
const UserModel = mongoose.model("User", userSchema);

export class FriendRepository {
    async getFriends(userId) {
        try {
            const friends = await FriendModel.find({ 
                user: userId,
                status: 'accepted'
            }).populate('friend');
            return friends.map(friendship => friendship.friend);
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    async getPendingRequests(userId) {
        try {
            const requests = await FriendModel.find({ 
                friend: userId,
                status: 'pending'
            }).populate('user');
            return requests.map(request => request.user);
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    async toggleFriendship(userId, friendId) {
        try {
            let friendship = await FriendModel.findOne({
                user: userId,
                friend: friendId
            });
            
            if (friendship) {
                // Toggle status
                friendship.status = friendship.status === 'accepted' ? 'rejected' : 'accepted';
            } else {
                friendship = new FriendModel({
                    user: userId,
                    friend: friendId,
                    status: 'accepted'
                });
            }

            await friendship.save();
            return friendship;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    async respondToRequest(userId, friendId, response) {
        try {
            const friendship = await FriendModel.findOne({
                user: friendId,
                friend: userId,
                status: 'pending'
            });
            
            if (!friendship) {
                throw new ApplicationError("Friend request not found", 404);
            }
            
            friendship.status = response;
            await friendship.save();
            return friendship;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }
}
