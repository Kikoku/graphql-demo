import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';
import User from '../models/user';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    bestFriend: {
       type: UserType,
       resolve: user => User.getUserById(user.bestFriend)
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve: user => user.friends.map(User.getUserById)
    }
  })
});

export default UserType;
