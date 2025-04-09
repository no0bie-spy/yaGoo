import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  licenseNumber: { type: String, required: true },
  licenseFrontPhoto: { type: String, required: true }, 
  citizenshipPhoto: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

export const Document = mongoose.model('Document', documentSchema);
