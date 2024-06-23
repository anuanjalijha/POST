import { FriendRepository } from "./friendship.repository.js";

export class FriendController {
    constructor() {
        this.friendRepository = new FriendRepository();
    }

    async getFriends(req, res) {
        try {
            const { userId } = req.params;
            const friends = await this.friendRepository.getFriends(userId);
            return res.status(200).send(friends);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async getPendingRequests(req, res) {
        try {
            const userId  = req.userID;
            const requests = await this.friendRepository.getPendingRequests(userId);
            return res.status(200).send(requests);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async toggleFriendship(req, res) {
        try {
            const { friendId } = req.params;
            const userId = req.userID;
            const friendship = await this.friendRepository.toggleFriendship(userId, friendId);
            return res.status(200).send(friendship);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async respondToRequest(req, res) {
        try {
            const { friendId } = req.params;
            const userId = req.userID;
            const { response } = req.body;
            const validResponses = ['accepted', 'rejected'];
            if (!validResponses.includes(response)) {
                return res.status(400).send("Invalid response");
            }
            const friendship = await this.friendRepository.respondToRequest(userId, friendId, response);
            return res.status(200).send(friendship);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }
}
