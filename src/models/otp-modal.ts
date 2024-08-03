import mongoose, { Schema, Document } from "mongoose";

export interface OTP extends Document {
  email: string;
  //phoneNumber: string;
  otp: string;
  otpType: string;
  expiresAt: Date;
}

const otpSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    // phoneNumber: {
    //   type: Schema.Types.String,
    //   required: false,
    // },
    otp: { type: String, required: true },
    otpType: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const OTPModel = mongoose.model<OTP>("OTP", otpSchema);

export default OTPModel;
