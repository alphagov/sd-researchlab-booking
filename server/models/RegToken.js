import { Schema, model } from 'mongoose';

const RegTokenSchema = new Schema({
  regToken: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('RegToken', RegTokenSchema);
