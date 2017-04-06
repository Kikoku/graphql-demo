import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (user) => user.idUser
    },
    name: { type: GraphQLString },
    friends: {
      type: new GraphQLList(UserType),
      resolve: (user, args, { pool, friendsLoader, userLoader }) => {

        return friendsLoader.load(user.idUser).then(results => {
          var promises = results.map(function(friendRelationship) {
            return userLoader.load(friendRelationship.friendA === user.idUser ? friendRelationship.friendB : friendRelationship.friendA)
          })
          return Promise.all(promises)
        })
      }
    }
  })
});

export default UserType;
