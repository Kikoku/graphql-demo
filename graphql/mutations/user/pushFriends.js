import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import UserType from '../../types/user';
import User from '../../../models/user';

export default {
  type: UserType,
  description: 'Add a user to friendslist',
  args: {
    user: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'User Id'
    },
    friend: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Friend Id'
    }
  },
  resolve: (root, args) => {

    return User.findByIdAsync(args.user)
    .then(user => {
      user.friends.push(args.friend)
      return user.saveAsync()
    })

  }
}
