import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import UserType from '../../types/user';
import User from '../../../models/user';

export default {
  type: UserType,
  description: 'Add a user',
  args: {
    name: {
      name: 'Full Name string',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args) => {
    let newUser = new User({
      name: args.name
    })
    return newUser.saveAsync();
  }
}
