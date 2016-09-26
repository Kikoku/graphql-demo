import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const userSchema = new Schema ({
  name: String,
  bestFriend: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  friends: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
});

const User = mongoose.model('User', userSchema);

Bluebird.promisifyAll(User);
Bluebird.promisifyAll(User.prototype);

export default User;
