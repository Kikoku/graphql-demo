import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';

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
      resolve: (todo, args, {loaders}) => loaders.user.load(todo.author)
    }
  })
})

export default TodoType;
