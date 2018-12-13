import { Schema, model } from 'mongoose';

const TokenSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
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
    required: true,
    default: Date.now,
    expires: '2h'
  }
});

export default model('Token', TokenSchema);
