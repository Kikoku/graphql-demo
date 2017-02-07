import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import UserType from '../types/user';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';

export const generateToken = mutationWithClientMutationId({
  name: 'generateToken',
  inputFields: {
    name: {
      type: GraphQLString
    }
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: (user) => jwt.sign(user, process.env.JWT_SECRET)
    },
    viewer: {
      type: UserType,
      resolve: (user) => user
    }
  },
  mutateAndGetPayload: ({name}) => {

    return User.findOneAsync({name: name})

  }
})
