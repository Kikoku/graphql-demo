import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';
import userLoader from '../../loaders/user';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    bestFriend: {
       type: UserType,
       resolve: (user, args) => user.bestFriend ? userLoader.load(user.bestFriend) : null
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve: (user, args) => userLoader.loadMany(user.friends)
    }
  })
});

export default UserType;
