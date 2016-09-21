import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';
import UserType from '../../types/user';
import User from '../../models/user';
import {Schema} from 'mongoose';

export default {
  type: UserType,
  args: {
    id: {
      name: 'Root User\'s id',
      type: GraphQLID
    },
    friendId: {
      name: 'Friend\'s id',
      type: GraphQLID
    }
  },
  resolve: (root, args) => {
    return User.findByIdAsync(args.id)
    .then((user) => {
      user.friends.push(args.friendId);
      return user.saveAsync();
    })
  }
}
