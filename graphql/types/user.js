import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';
import {
  connectionFromPromisedArray,
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay'

import userLoader from '../../loaders/user';
import SearchType from './search';

const UserType = new GraphQLObjectType({
  name: 'User',
  interfaces: () => [SearchType],
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
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
    },
    searchPreviewText: {
      type: GraphQLString,
      resolve: (data) => `(user) ${data.name}`
    }
  })
});

const {connectionType: UserConnection} = connectionDefinitions({ nodeType: UserType })

export default UserType;
