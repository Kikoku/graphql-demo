import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';
import {
  connectionDefinitions,
  connectionFromPromisedArray,
  connectionArgs
} from 'graphql-relay';
import userLoader, { todoLoader } from './apiHelpers';
import UserType, { UserConnection } from './types/user';
import TodoType, { TodoConnection } from './types/todo';
import User from '../../models/user';
import Todo from '../../models/todo';
import { nodeField } from './node';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'ID of a User.'
        }
      },
      resolve: (_, args) => userLoader.load(args.id)
    },
    users: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(
        User.findAsync(),
        args
      )
    },
    todo: {
      type: TodoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'ID of a Todo'
        }
      },
      resolve: (_, args) => todoLoader.load(args.id)
    },
    todos: {
      type: TodoConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(
        Todo.findAsync(),
        args
      )
    },
  })
})

export default new GraphQLSchema({query: queryType})
