import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import jwt from 'jsonwebtoken';

export default {
  type: GraphQLString,
  description: 'generate an access_token',
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (_, { name, password }) => {
    return jwt.sign({
      name: 'token test',
      id: 'abc456'
    }, 'secret')
  }
}
