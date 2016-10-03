import {
  GraphQLList
} from 'graphql';

import TodoType from '../../types/todo';
import Todo from '../../../models/todo';

export default {
  type: new GraphQLList(TodoType),
  resolve: (user, args, {loaders}) => {
    return Todo.findAsync()
  }
};
