import { Router } from "express";
import validate from "../middlewares/validate.js";
import authController from "../controllers/authController.js";
import userValidation from "../validations/auth.js";

const authRouter = Router();

// Route for user registration
authRouter.post(
  "/register",
  validate(userValidation.register), // Validates registration inputs using Joi schema
  (req, res, next) => {
    next(); // Proceed to the register controller
  },
  authController.register // Registration controller logic
);

// Route for user login
authRouter.post(
  "/login",
  validate(userValidation.login), // Validates login inputs using Joi schema
  authController.login // Login controller logic
);

// Route for email verification (updated to handle OTP-based flow)
authRouter.post(
  "/verify-email",
  validate(userValidation.verifyEmail), // Validates email and OTP inputs
  authController.verifyEmail // Email verification logic
);

export default authRouter;
