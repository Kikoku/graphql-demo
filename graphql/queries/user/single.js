import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import UserType from '../../types/user';

export default {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args, { userLoader }) => userLoader.load(args.id)
};
