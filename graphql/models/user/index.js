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

module.exports = User;

module.exports.getUsersList = () => {
  return new Promise((resolve, reject) => {
    User.find().exec((err, res) => {
      err ? reject(err) : resolve(res);
    })
  });
}

module.exports.getUserById = (id) => {
  console.log('id', id)
  return new Promise((resolve, reject) => {
    User.findById(id).exec((err, res) => {
      err ? reject(err) : resolve (res);
    })
  })
}
