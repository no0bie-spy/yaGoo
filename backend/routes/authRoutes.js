import { Router } from "express";
import validate from "../middlewares/validate.js";
import authController from "../controllers/authController.js";
import userValidation from "../validations/auth.js";

const authRouter = Router();

// Route for user registration
authRouter.post(
  "/register",
  validate( userValidation.register ), // Pass the schema with the 'body' key
  authController.register // Registration controller logic
);

// Route for user login
authRouter.post(
  "/login",
  validate({ body: userValidation.login }), // Pass the schema with the 'body' key
  authController.login // Login controller logic
);

// Route for email verification (updated to handle OTP-based flow)
authRouter.post(
  "/verify-email",
  validate( userValidation.verifyEmail ), // Pass the schema with the 'body' key
  authController.verifyEmail // Email verification logic
);

export default authRouter;
