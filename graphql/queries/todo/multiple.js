import {
  GraphQLList
} from 'graphql';

import TodoType from '../../types/todo';

export default {
  type: new GraphQLList(TodoType),
  resolve: (user, args, {loaders, viewer}) => {
    return loaders.todo.loadAll({viewer})
  }
};
