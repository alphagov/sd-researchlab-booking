import { model, Schema } from 'mongoose';

const TwoFactorSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
    expires: 120000
  },
  token: {
    type: Number,
    required: true
  }
});

export default model('TwoFactor', TwoFactorSchema);
