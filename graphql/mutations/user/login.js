import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import jwt from 'jsonwebtoken';
import User from '../../../models/user';

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
    return User.findOneAsync({name: new RegExp(`${name}`, 'i')})
    .then((user) => {
      return jwt.sign({
        name: user.name,
        id: user.id
      }, 'secret')
    });
  }
}
