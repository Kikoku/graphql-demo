import {
  GraphQLList
} from 'graphql';
import User from '../../../models/user'

import UserType from '../../types/user';

export default {
  type: new GraphQLList(UserType),
  resolve: (user, args) => User.findAsync()
};
