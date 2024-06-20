import mongoose from "mongoose";
import TokenBlacklist from './tokenBlacklist.model.js';
import { userSchema } from "./user.schema.js";
import jwt from 'jsonwebtoken';
import { ApplicationError } from "../../error-handler/applicationError.js";

// creating model from schema.
const UserModel = mongoose.model('User', userSchema)

export default class UserRepository{

    async resetPassword(userID, hashedPassword){
        try{
            let user = await UserModel.findById(userID);
            if(user){
                user.password=hashedPassword;
                user.save();
            }else{
                throw new Error("No such user found");
            }
            
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async signUp(user){
        
        try{
            // create instance of model.
            // const hashedPassword = await bcrypt.hash(user.password, 12);
            // user.password = hashedPassword;
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }
        catch(err){
            console.log(err);
            if(err instanceof mongoose.Error.ValidationError){
                throw err;
            }else{
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
            
        }
    }

    async signIn(email, password){
        try{
           return await UserModel.findOne({email, password});
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async findByEmail(email) {
        try{
        return await UserModel.findOne({email});
      }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
      }
      }
      async logout(token) {
        
        try {
            const decoded = jwt.decode(token);
            console.log(decoded);
            
            if (!decoded) {
                throw new ApplicationError("Invalid token", 400);
            }
            const expiration = decoded.exp;
            const finds = await TokenBlacklist.findOne({token});
            if(!finds){
            const blacklistEntry = new TokenBlacklist({ token, expiresAt:expiration });
            await blacklistEntry.save();
            }
        } catch(err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async findById(userID) {
        try {
            return await UserModel.findById(userID);
        } catch(err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async findAll() {
        try {
            return await UserModel.find();
        } catch(err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async updateById(userID, updateData) {
        try {
            const result = await UserModel.findByIdAndUpdate(userID,updateData);
            
            result.save();
            const user = await UserModel.findById(userID);
            
            return user;
            
        } catch(err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

}