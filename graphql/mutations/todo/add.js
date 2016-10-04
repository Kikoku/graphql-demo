import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';
import TodoType from '../../types/todo';
import Todo from '../../../models/todo';

export default {
  type: TodoType,
  description: 'Add a todo',
  args: {
    title: {
      name: 'Todo string',
      type: new GraphQLNonNull(GraphQLString)
    },
    author: {
      name: 'Author ID',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args) => {
    let newTodo = new Todo({
      title: args.title,
      author: args.author,
      completed: false
    })
    return newTodo.saveAsync();
  }
}
