import { OTPRepository } from "./otp.repository.js";
import nodemailer from "nodemailer";
import { userSchema } from "../user/user.schema.js";
import mongoose from 'mongoose';
const UserModel = mongoose.model('User',userSchema);

export class OTPController {
    constructor() {
        this.otpRepository = new OTPRepository();
            }

    async sendOTP(req, res) {
        try {
            const { email } = req.body;
            console.log(email)
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).send("User not found");
            }

            const otp = await this.otpRepository.createOTP(user._id);
            // console.log(otp);
            // console.log(process.env.EMAIL_USER);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true, // or another email service
                auth: {
                    user: 'cnanjali9@gmail.com',
                    pass: 'klfx fgre pkxe fxdu'
                }
            });
    

            const mailOptions = {
                from: 'cnanjali9@gmail.com',
                to: email,
                subject: 'Your OTP for Password Reset',
                text: `Your OTP is ${otp}`
            };
            
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log("Email sent: ", info.envelope);
                return res.status(200).send("OTP sent successfully");
            } catch (error) {
                console.log("Error sending email:", error);
                return res.status(500).send("Error sending email");
            }
            // return res.status(200).send("OTP sent successfully");
        } catch (err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async verifyOTP(req, res) {
        try {
            const { email, otp } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).send("User not found");
            }

            await this.otpRepository.verifyOTP(user._id, otp);

            return res.status(200).send("OTP verified successfully");
        } catch (err) {
            console.log(err);
            return res.status(400).send(err.message || "Something went wrong");
        }
    }
}
