import mongoose from "mongoose";

export const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '10m' // OTP expires in 10 minutes
    }
});

const OTPModel = mongoose.model('OTP', otpSchema);
export default OTPModel;
