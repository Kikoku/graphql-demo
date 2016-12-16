import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import {
  connectionDefinitions,
  globalIdField,
} from 'graphql-relay';
import UserType from './user';
import userLoader from '../apiHelpers';
import { nodeInterface } from '../node';

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: globalIdField(),
    title: {
      type: GraphQLString
    },
    author: {
      type: UserType,
      resolve: (todo, args) => userLoader.load(todo.author)
    },
    completed: {
      type: GraphQLBoolean
    }
  }),
  interfaces: () => [nodeInterface]
})

export const { connectionType: TodoConnection } = connectionDefinitions({
  nodeType: TodoType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of videos in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default TodoType;
