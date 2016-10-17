import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';
import userLoader from '../../loaders/user';

import UserType from './user';

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    author: {
      type: UserType,
      resolve: (todo, args) => userLoader.load(todo.author)
    }
  })
})

export default TodoType;
