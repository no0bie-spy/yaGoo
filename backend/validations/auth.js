import Joi from 'joi';

const userValidation = {
  // Validation for user registration
  register: Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.empty': 'First Name is required',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must not exceed 50 characters',
      }),
    middleName: Joi.string()
      .min(3)
      .max(50)

      .messages({
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must not exceed 50 characters',
      }),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.empty': 'Last name is required',
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
      .valid('rider', 'customer') 
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

      phone: Joi.string()
      .min(10)
      .required()
      .messages({
        'string.min': 'Number must be 10 words minimum',
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
      .length(6)
      .required()
      .messages({
        'string.empty': 'OTP is required',
        'string.length': 'OTP should be 6 digits long',
      }),
  }),

  // 🚗 Rider-specific registration (after email verification)
  riderRegistration: Joi.object({
    userId: Joi.string().required().messages({
      'string.empty': 'User ID is required',
    }),

    vehicleType: Joi.string()
      .valid('bike', 'car', 'scooter', 'van', 'other')
      .required()
      .messages({
        'any.only': 'Invalid vehicle type',
        'string.empty': 'Vehicle type is required',
      }),

    vehicleNumber: Joi.string()
      .pattern(/^[A-Z0-9\-]{5,15}$/i)
      .required()
      .messages({
        'string.empty': 'Vehicle number is required',
        'string.pattern.base': 'Invalid vehicle number format',
      }),

    licenseNumber: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required()
      .messages({
        'string.empty': 'License number is required',
        'string.alphanum': 'License number must be alphanumeric',
      }),

    licenseDocumentUrl: Joi.string()
      .uri()
      .required()
      .messages({
        'string.uri': 'License document must be a valid URL',
        'string.empty': 'License document is required',
      }),

    vehicleRegistrationDocumentUrl: Joi.string()
      .uri()
      .required()
      .messages({
        'string.uri': 'Vehicle registration document must be a valid URL',
        'string.empty': 'Vehicle registration document is required',
      }),
  }),
};

export default userValidation;
