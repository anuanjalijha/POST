import mongoose from 'mongoose';

export const postSchema = new mongoose.Schema({
    imageUrl: { type: mongoose.Schema.Types.Mixed},
    caption: { type: String, required: true },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
