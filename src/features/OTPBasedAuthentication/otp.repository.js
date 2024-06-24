import OTPModel from "./otp.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import crypto from "crypto";

export class OTPRepository {
    async createOTP(userId) {
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpDoc = new OTPModel({ user: userId, otp });
        await otpDoc.save();
        return otp;
    }

    async verifyOTP(userId, otp) {
        const otpDoc = await OTPModel.findOne({ user: userId, otp });
        console.log(otpDoc);
        if (!otpDoc) {
            throw new ApplicationError("Invalid or expired OTP", 400);
        }
        await OTPModel.deleteOne({ _id: otpDoc._id }); // OTP can be used only once
        return true;
    }
}
