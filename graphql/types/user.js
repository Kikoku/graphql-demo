import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    bestFriend: {
       type: UserType,
       resolve: (user, args, {loaders}) => loaders.user.load(user.bestFriend.toString())
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve: (user, args, {loaders}) => user.friends.map((friend) => loaders.user.load(friend.toString()))
    }
  })
});

export default UserType;
