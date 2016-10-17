import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import userLoader from '../../../loaders/user'

import UserType from '../../types/user';

export default {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args) => userLoader.load(args.id.toString())
};
