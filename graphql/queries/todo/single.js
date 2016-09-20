import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import TodoType from '../../types/todo';
import Todo from '../../models/todo';

export default {
  type: TodoType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, options) {
    return Todo.findById(params.id).exec();
  }
};

// Exmample query
// {
//   todo(id: 1) {
//     title,
//     id,
//     completed
//   }
// }
