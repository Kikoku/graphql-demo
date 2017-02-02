import {
  GraphQLObjectType,
  GraphQLString,
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
import userLoader from './apiHelpers';
import jwt from 'jsonwebtoken'

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: ViewerType,
      args: {
        token: {
          type: GraphQLString
        }
      },
      resolve: (_, {token}, context, {rootValue}) => {
        if(token) {
          let { viewer } = jwt.verify(token, process.env.JWT_SECRET);
          return viewer;
        } else {
          return { name: 'Guest' }
        }
      }
    }
  })
})

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})
