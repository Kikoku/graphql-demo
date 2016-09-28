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
       resolve: (user, args, {loaders}) => user.bestFriend ? loaders.user.load({id: user.bestFriend, location: 'bestFriend'}) : null
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve: (user, args, {loaders}) => user.friends.map(friend => loaders.user.load({id: friend, location: 'friend'}))
    }
  })
});

export default UserType;
