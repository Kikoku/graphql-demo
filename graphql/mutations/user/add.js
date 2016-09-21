import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import UserType from '../../types/user';
import User from '../../models/user';

export default {
  type: UserType,
  description: 'Add a user',
  args: {
    name: {
      name: 'User Name String',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args) => {
    let newUser = new User({
      name: args.name
    });
    newUser.id = newUser._id;
    return new Promise((resolve, reject) => {
      newUser.save((err) => {
        if(err) reject(err);
        else resolve(newUser)
      })
    });
  }
}
