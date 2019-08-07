import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  eventId: {
    type: String,
    required: true
  },
  calendarId: {
    type: String,
    required: true
  },
  eventBooked: {
    type: Date,
    default: Date.now
  }
});

export default model('Events', EventSchema);
