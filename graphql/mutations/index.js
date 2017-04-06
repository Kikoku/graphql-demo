import addUser from './user/addUser';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import UserType from '../types/user'

export const mutationType = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    addUser
  })
})
