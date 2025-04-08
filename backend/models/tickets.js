import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  bidAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['open', 'accepted', 'completed', 'cancelled'],
    default: 'open',
  },
  acceptedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default model('Ticket', ticketSchema);
