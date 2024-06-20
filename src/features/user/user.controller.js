
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';
import { userSchema } from './user.schema.js';
import mongoose from 'mongoose';
const UserModel = mongoose.model('User', userSchema)

export default class UserController {

  constructor(){
    this.userRepository = new UserRepository();
  }
  async resetPassword(req, res, next){
    const {newPassword} = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const userID = req.userID;
    try{
      await this.userRepository.resetPassword(userID, hashedPassword)
      res.status(200).send("Password is updated");
    }catch(err){
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }

  async signUp(req, res, next) {
    let {
      name,
      email,
      password,
      gender,
    } = req.body;
    try{
      
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const user = {
      name,
      email,
      password:hashedPassword,
      gender
    };
    await this.userRepository.signUp(user);
    res.status(201).send(user);
  }catch(err){
    next(err);
  }
  }
  async signIn(req, res, next) {
    try{
      // 1. Find user by email.
    const user = await this.userRepository.findByEmail(req.body.email);
    if(!user){
      return res
        .status(400)
        .send('Incorrect Credentials');
    }else{
      // 2. Compare password with hashed password.
      const result = await bcrypt.compare(req.body.password, user.password);
      if(result){
 // 3. Create token.
 const token = jwt.sign(
  {
    userID: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '1h',
  }
);
// let oldTokens = user.tokens || [];
// // console.log(oldTokens);
// if(oldTokens.length){
//   oldTokens = oldTokens.filter(t =>{

//     const timeDiff = (Date.now()-parseInt(t.signedAt))/1000
//     // console.log(timeDiff);
//     if(timeDiff<3600){
//       return t;
//     }
//   })
//   // console.log(oldTokens);
// }
await UserModel.findByIdAndUpdate(user._id,{tokens:[{token,signedAt:Date.now().toString()}]});

// 4. Send token.
return res.status(200).send(token);
      }else{
        return res
        .status(400)
        .send('Incorrect Credentials');
      }
    }
    }catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
  async logout(req,res,next){
    if (req.headers && req.headers.authorization){
    const token =   req.headers.authorization;
    if(!token){
      return res
        .status(401)
        .send('Authorization Failed');

    }
      
    
    const tokenss = await UserModel.findById(req.userID);
    const tokens = tokenss.tokens;
    // console.log(token);
    const filteredToken = tokens.filter(t=> t.token===token);
    
    // console.log(tokens.token===token);
    // if(!filteredToken){
    //   return res.status(401).send('please enter valid token');
    // }
    const newTokens = tokens.filter(t=> t.token!== token)
    console.log(newTokens);
    await UserModel.findByIdAndUpdate(req.userID,{tokens:newTokens})
    
    return res
        .status(401)
        .send('logout sucessfully');

    // await UserModel.findByIdAndUpdate(req.userID,{tokens:tokens.filter(t => t.token !== token)});
  }
    // const token = req.headers['authorization'];
    // console.log(token);
    //     try {
    //         await this.userRepository.logout(token);
    //         res.status(200).send("Successfully logged out");
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(200).send("Something went wrong");
    //     }
      
    

  }
  async get_details(req,res,next){
    const userID = req.params.userId;
    try {
      const user = await this.userRepository.findById(userID);
      if (user) {
        const { password, ...userDetails } = user.toObject();
        res.status(200).json(userDetails);
      } else {
        res.status(404).send('User not found');
      }
    } catch(err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }

  }
  async getAllUserDetails(req, res, next) {
    try {
      const users = await this.userRepository.findAll();
      const userDetails = users.map(user => {
        const { password, ...userDetail } = user.toObject();
        return userDetail;
      });
      res.status(200).json(userDetails);
    } catch(err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
  async updateUserDetails(req, res, next) {
    const userID = req.params.userId;
    const updateData = req.body;
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }
    try {
      const updatedUser = await this.userRepository.updateById(userID, updateData);
      if (updatedUser) {
        const { password, ...userDetails } = updatedUser.toObject();
        res.status(200).json(userDetails);
      } else {
        res.status(404).send('User not found');
      }
    } catch(err) {
      console.log(err);
      return res.status(200).send("Something went wrong");

    }
  }
}
