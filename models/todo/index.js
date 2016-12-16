import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const todoSchema = new Schema({
  title: {
    type: String,
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  completed: {
    type: Boolean
  }
})

const Todo = mongoose.model('Todo', todoSchema);

Bluebird.promisifyAll(Todo);
Bluebird.promisifyAll(Todo.prototype);

export default Todo;
