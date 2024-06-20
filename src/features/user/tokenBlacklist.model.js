import mongoose from 'mongoose';

const tokenBlacklistSchema = new mongoose.Schema({
    tokens: [{type:Object}],
});

const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema);

export default TokenBlacklist;
