import users from './user/multiple';
import user from './user/single';

import {
  GraphQLObjectType,
} from 'graphql';

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user,
    users
  })
})
