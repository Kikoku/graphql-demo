import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';
import {
  connectionDefinitions,
  connectionFromPromisedArray,
  connectionArgs
} from 'graphql-relay';
import { mutationType } from './mutations';
import UserType, { UserConnection } from './types/user';
import ViewerType from './types/viewer';
import User from '../../models/user';
import { nodeField } from './node';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: ViewerType,
      resolve: (_, args, context, ast) => ({name: 'Collin'})
    }
  })
})

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})
