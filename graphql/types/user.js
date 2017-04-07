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
       resolve: (user, args, { userLoader }) => user.bestFriend ? userLoader.load(user.bestFriend) : null
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve: (user, args, { userLoader }) => userLoader.loadMany(user.friends)
    }
  })
});

export default UserType;
