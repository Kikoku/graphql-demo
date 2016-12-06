import {
  GraphQLList
} from 'graphql';
import Todo from '../../../models/todo';
import {canSee} from '../../../helpers'

import TodoType from '../../types/todo';

export default {
  type: new GraphQLList(TodoType),
  resolve: (user, args, {viewer}) => Todo.findAsync()
  .then(todos => {
    return todos.map(todo => {
      return canSee(todo, viewer) ? todo : null;
    })
  })
};
