import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema ({
  comment: String
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
