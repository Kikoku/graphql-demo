import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import TodoType from '../../types/todo';

export default {
  type: TodoType,
  args: {
    id: {
      name: 'Todo id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args, {loaders}) => loaders.todo.load(args.id.toString())
}
