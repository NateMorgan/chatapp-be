import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'Profile' },
  content: String,
});

const dialogueSchema = new Schema(
  {
    name: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Dialogue = mongoose.model('Dialogue', dialogueSchema);

export { Dialogue };
