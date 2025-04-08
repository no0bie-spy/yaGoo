import joi from 'joi';

const userValidationSchema = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    role: joi.string().valid('rider', 'customer').required(),
    bio: joi.string().max(500).optional(),
    profileImage: joi.string().uri().optional(),
    isEmailVerified: joi.boolean().default(false),
});
export default userValidationSchema;
