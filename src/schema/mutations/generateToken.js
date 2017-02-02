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
      resolve: (user) => {
        let token = jwt.sign({ viewer: user }, process.env.JWT_SECRET);
        return (token)
      }
    }
  },
  mutateAndGetPayload: ({name}) => {

    return User.findOneAsync({name: name})

  }
})
