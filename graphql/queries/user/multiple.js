import {
  GraphQLList
} from 'graphql';
import userLoader from '../../../loaders/user'

import UserType from '../../types/user';

export default {
  type: new GraphQLList(UserType),
  resolve: (user, args) => userLoader.loadAll()
};
