import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import ViewerType from '../types/viewer';
import jwt from 'jsonwebtoken'

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: ViewerType,
      args: {
        token: {
          type: GraphQLString
        }
      },
      resolve: (_, { token } ) => {
        if(token) {
          return new Promise((resolve, reject) => {
            try {
              resolve(jwt.verify(token, 'secret'))
            } catch(err) {
              reject(err)
            }
          })
        } else {
          return {
            name: 'test',
            id: 'abc123'
          }
        }
      }
    }
  })
})

export default queryType;
