import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import UserType from '../types/user';
import User from '../../../models/user';

export const addUser = mutationWithClientMutationId({
  name: 'addUser',
  inputFields: {
    name: {
      type: GraphQLString
    }
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: (user) => {
        console.log('user', user);
        return (user)
      }
    }
  },
  mutateAndGetPayload: ({name}) => {

    console.log('name', {name: name});

    let newUser = new User({name: name});

    return newUser.saveAsync();


  }
})
