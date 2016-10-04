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
  resolve: (root, args, {loaders, viewer}) => loaders.todo.load({id: args.id.toString(), viewer})
}
