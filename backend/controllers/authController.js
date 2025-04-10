import User from "../models/users.js";  // Import the User model
import bcrypt from "bcryptjs";  // For hashing passwords
import jwt from "jsonwebtoken";  // For generating JWT tokens
import { catchAsync } from "../helper/catchAsync.js";  // Async error handler
import {sendRecoveryEmail } from "../mailer/email.js";  // Using OTP and email helper
import { config } from 'dotenv';
import { Otp } from "../models/otp.js";
config(); 


// Controller for user registration
const register = catchAsync(async (req, res) => {
  const {  firstName, lastName, email, username, password,phone, role, bio, profileImage } = req.body;

  // Check if the email or username already exists in the database
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error("Email or username already exists.");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Call the function to send the recovery email
  const { token, emailInfo} = await sendRecoveryEmail(email);
  
  //hash the otp to save into the database
  const hashedToken = await bcrypt.hash(token,10);

  const expiryOTP = new Date(Date.now()+ 10*60*1000); // valid for 10 minutes

  // Create a new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword,
    role,
    phone,
    bio,
    profileImage,
      // Store OTP in user document for verification
  });

 const  otpSaved = new Otp({
  email: email,
  otp: hashedToken,
  otpExpiresAt: expiryOTP,
 })

  // Save the user to the database
  await newUser.save();

  //save otp for the respective user
  await otpSaved.save();
  
  return res.status(201).json({
    message: "User registered successfully. Please verify your email.",
    user: { name: newUser.name, email: newUser.email, role: newUser.role },
    emailInfo
    
  });
});

// Controller for user login
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials.");
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials.");
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

  return res.status(200).json({
    message: "Login successful.",
    user: { name: user.name, email: user.email, role: user.role },
    token,
  });
});

// Controller for email verification (example with OTP)
const verifyEmail = catchAsync(async (req, res) => {
  const { email, otp } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found.");
  }


  const otpRecord = await Otp.findOne({ email });
  // Verify OTP (this assumes you have stored the OTP in the user document)
  const otpValid = bcrypt.compare(otp, otpRecord.otp);
  if(!otpValid){
    throw new  Error("OTP isnot valid")
  }

  // Set the email as verified
  user.isEmailVerified = true;
  user.otp = null;  // Clear the OTP after successful verification
  await user.save();

  return res.status(200).json({
    message: "Email verified successfully.",
  });
});



const authController = {
  register,
  login,
  verifyEmail,
};

export default authController;
