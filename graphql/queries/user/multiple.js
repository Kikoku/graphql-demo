import {
  GraphQLList
} from 'graphql';

import UserType from '../../types/user';

export default {
  type: new GraphQLList(UserType),
  resolve: (user, args, {loaders}) => {
    return loaders.user.loadAll()
  }
};
o
