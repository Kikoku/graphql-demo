import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const refreshSchema = new Schema ({
  userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    expires: '30d',
    default: Date.now(),
  }
});

const RefreshToken = mongoose.model('RefreshToken', refreshSchema);

Bluebird.promisifyAll(RefreshToken);
Bluebird.promisifyAll(RefreshToken.prototype);

export default RefreshToken;
