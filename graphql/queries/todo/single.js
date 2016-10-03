import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import TodoType from '../../types/todo';
import Todo from '../../../models/todo';

export default {
  type: TodoType,
  args: {
    id: {
      name: 'Todo id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args, {loaders}) => Todo.findByIdAsync(args.id)
}
