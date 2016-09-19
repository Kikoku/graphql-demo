import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import TodoType from '../../types/todo';
import Todo from '../../models/todo'

export default {
  type: TodoType,
  description: 'Add a Todo',
  args: {
    title: {
      name: 'Todo title',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args) => {
    let newTodo = new Todo({
      title: args.title,
      completed: false
    })
    newTodo.id = newTodo._id;
    return new Promise((resolve, reject) => {
      newTodo.save((err) => {
        if(err) reject(err)
        else resolve(newTodo)
      })
    });
  }
};
