import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  licenseNumber: { type: String, required: true },
  licenseFrontPhoto: { type: String, required: true },
  citizenshipPhoto: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Document = mongoose.model('Document', documentSchema);
