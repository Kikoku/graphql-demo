import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema ({
  title: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
