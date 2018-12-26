import { Schema, model } from 'mongoose';

const RegTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  regToken: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('RegToken', RegTokenSchema);

// put userId in here? then populate or use GraphQl to resolve it?
// we don't need email in here then
