import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    default: null,
  },
  
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
   
  },
  role: {
    type: String,
    enum: ['rider', 'customer'],
    required: true, 
  },
  bio: {
    type: String,
    default: '',
  },
  profileImage: {
    type: String,
    default: '',
  },
  isEmailVerified: {
    type: Boolean,
    default: false, 
    
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    },
  }, { timestamps: true });
  
  
  const User = mongoose.model('User', userSchema);

export default User;
