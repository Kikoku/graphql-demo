import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import {
  fromGlobalId,
  connectionFromPromisedArray,
  connectionArgs
} from 'graphql-relay';
import userLoader from '../apiHelpers.js';
import UserType, { UserConnection } from './user';
import User from '../../../models/user'


const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'ID of a User.'
        }
      },
      resolve: (_, args, context, ast) => {
        return userLoader.load(fromGlobalId(args.id).id)
      }
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

export default ViewerType
