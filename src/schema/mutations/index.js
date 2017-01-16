import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import { addUser } from './addUser';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addUser
  })
})
