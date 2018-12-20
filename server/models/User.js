import { Schema, model } from 'mongoose';
import { hashCreator } from '../utils/cryptoUtils';

// const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },

  mfaCode: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // encrypt password
    const passwordHash = await hashCreator(this.password);
    this.password = passwordHash;

    next();
  } catch (error) {
    return next(error);
  }
});

export default model('User', UserSchema);
