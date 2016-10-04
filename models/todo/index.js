import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const todoSchema = new Schema ({
  title: String,
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  completed: Boolean
})

const Todo = mongoose.model('Todo', todoSchema);

Bluebird.promisifyAll(Todo);
Bluebird.promisifyAll(Todo.prototype);

export default Todo;
