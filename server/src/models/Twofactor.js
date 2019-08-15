import { model, Schema } from 'mongoose';

const TwoFactorSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
    expires: 120
  },
  token: Number
});

export default model('TwoFactor', TwoFactorSchema);
