import mongoose from 'mongoose';

export const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: { type: String, required: true },
    postId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
});
