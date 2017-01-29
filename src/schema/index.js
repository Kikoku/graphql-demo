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
import { mutationType } from './mutations';
import UserType, { UserConnection } from './types/user';
import User from '../../models/user';
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
    }
  })
})

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})
