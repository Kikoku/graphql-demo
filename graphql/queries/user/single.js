import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import UserType from '../../types/user';
import User from '../../models/user';

export default {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args) => User.getUserById(args.id)
};
