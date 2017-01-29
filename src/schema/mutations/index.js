import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import { addUser } from './addUser';
import { generateToken } from './generateToken'

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addUser,
    generateToken
  })
})
