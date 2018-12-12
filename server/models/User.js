import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';

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

  textCode: {
    type: Number
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // encrypt password
    genSalt(12, (err, salt) => {
      hash(this.password, salt, (err, hash) => {
        this.password = hash;
      });
    });

    next();
  } catch (error) {
    return next(error);
  }
});

export default model('User', UserSchema);
