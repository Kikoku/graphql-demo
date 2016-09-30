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
       resolve: (user, args, {loaders, viewer}) => user.bestFriend ? loaders.user.load({id: user.bestFriend, viewer}) : null
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve: (user, args, {loaders, viewer}) => user.friends.map(friend => loaders.user.load({id: friend, viewer}))
    }
  })
});

export default UserType;
