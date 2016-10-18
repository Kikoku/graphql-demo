import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';
import userLoader from '../../loaders/user';
import UserType from './user';
import SearchType from './search';
console.log('todo', SearchType);

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  interfaces: () => [SearchType],
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
    },
    searchPreviewText: {
      type: GraphQLString,
      resolve: (data) => `(todo) ${data.title}`
    }
  })
})

export default TodoType;
