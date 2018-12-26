import { Schema, model } from 'mongoose';

const AllowedSchema = new Schema({
  domain: {
    type: String,
    trim: true,
    required: true
  }
});

export default model('AllowedDomains', AllowedSchema);
