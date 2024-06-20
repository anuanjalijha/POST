// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

// 2. Initialize Express router.
const userRouter = express.Router();

const userController = new UserController();

// All the paths to controller methods.

userRouter.post('/signup', (req, res, next)=>{
    userController.signUp(req, res, next)
});
userRouter.post('/signin', (req, res)=>{
    userController.signIn(req, res)
});
userRouter.get('/logout', jwtAuth,(req, res)=>{
    userController.logout(req, res)
});
userRouter.get('/get-details/:userId',jwtAuth,(req,res)=>{
    userController.get_details(req,res)
})
userRouter.get('/get-all-details',(req,res)=>{
    userController.getAllUserDetails(req,res)
})
userRouter.put('/update-details/:userId',(req,res)=>{
    userController.updateUserDetails(req,res)

})
userRouter.put('/resetPassword', jwtAuth, (req, res, next)=>{
    userController.resetPassword(req, res, next)
});

export default userRouter;
