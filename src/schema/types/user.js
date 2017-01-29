import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay'
import userLoader from '../apiHelpers';
import { nodeInterface  } from '../node';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString
    },
    bestFriend: {
       type: UserType,
       resolve: (user, args) => user.bestFriend ? userLoader.load(user.bestFriend) : null
    },
    friends: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (user, args) => {
        return connectionFromPromisedArray(
        userLoader.loadMany(user.friends),
        args
      )}
    }
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: UserConnection } = connectionDefinitions({
  nodeType: UserType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of users in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default UserType;
