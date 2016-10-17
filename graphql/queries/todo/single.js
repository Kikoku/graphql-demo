import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import todoLoader from '../../../loaders/todo'

import TodoType from '../../types/todo';

export default {
  type: TodoType,
  args: {
    id: {
      name: 'Todo id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args, {viewer}) => todoLoader.load({id: args.id.toString(), viewer})
}
