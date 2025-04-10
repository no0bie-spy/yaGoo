import mongoose from 'mongoose';
// import User from './users.js';

const otpSchema = new mongoose.Schema({
  email: { type: String,ref: "User", unique: true, required: true },
  otp: { type: String, required: true },
  otpExpiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Otp = mongoose.model('Otp', otpSchema);