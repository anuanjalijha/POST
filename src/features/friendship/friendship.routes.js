import express from 'express';
import { FriendController } from './friendship.controller.js';

const friendRouter = express.Router();
const friendController = new FriendController();

friendRouter.get('/get-friends/:userId', (req, res) => {
    friendController.getFriends(req, res);
});

friendRouter.get('/get-pending-requests', (req, res) => {
    friendController.getPendingRequests(req, res);
});

friendRouter.post('/toggle-friendship/:friendId', (req, res) => {
    friendController.toggleFriendship(req, res);
});

friendRouter.post('/response-to-request/:friendId', (req, res) => {
    friendController.respondToRequest(req, res);
});

export default friendRouter;
