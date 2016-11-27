import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';
import userLoader from '../../loaders/user';
import SearchType from './search';
import { connectionDefintions, connectionArgs } from '../connection/connections';
import { connectionFromPromisedArray } from '../connection/arrayconnection.js';
import CardType from './card'
import User from '../../models/user';

function getUser(id) {
  return User.findByIdAsync(id)
  .then(user => {
    return user;
  });
}

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
      type: userConnection.connectionType,
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

const userConnection = connectionDefintions({ nodeType: UserType })

export default UserType;
