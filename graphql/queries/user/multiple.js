import {
  GraphQLList
} from 'graphql';

import UserType from '../../types/user';
import User from '../../../models/user';

export default {
  type: new GraphQLList(UserType),
  resolve: (user, args, {loaders}) => {
    console.log('loadAll');
    return loaders.user.loadAll()
  }
};
