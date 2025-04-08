import Joi from 'joi';

const userValidation = {
  // Validation for user registration
  register: Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must not exceed 50 characters',
      }),

    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required',
      }),

    username: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.empty': 'Username is required',
        'string.min': 'Username must be at least 3 characters',
        'string.max': 'Username must not exceed 30 characters',
      }),

    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
      }),

    role: Joi.string()
      .valid('rider', 'customer')  // Role can be either 'rider' or 'customer'
      .required()
      .messages({
        'any.only': 'Role must be either rider or customer',
        'string.empty': 'Role is required',
      }),

    bio: Joi.string()
      .max(500)
      .optional()
      .messages({
        'string.max': 'Bio must not exceed 500 characters',
      }),

    profileImage: Joi.string()
      .uri()
      .optional()
      .messages({
        'string.uri': 'Invalid profile image URL',
      }),

    isEmailVerified: Joi.boolean()
      .default(false)
      .optional()
      .messages({
        'boolean.base': 'isEmailVerified must be a boolean value',
      }),
  }),

  // Validation for user login
  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required',
      }),

    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
      }),
  }),

  // Validation for email verification
  verifyEmail: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required',
      }),

    otp: Joi.string()
      .length(6) // Assuming OTP is 6 digits long
      .required()
      .messages({
        'string.empty': 'OTP is required',
        'string.length': 'OTP should be 6 digits long',
      }),
  }),
};

export default userValidation;
