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
      resolve: (user, args, { connection, userLoader }) => {
        return new Promise((resolve, reject) => {
          connection.query(`
            SELECT *
            FROM friends
            WHERE friends.friendA=${user.idUser} OR friends.friendB=${user.idUser}
          `, (err, res) => {
            if(err) reject(err);
            resolve(res)
          })
        }).then(results => {
          var promises = results.map(function(friendRelationship) {
            return userLoader.load(friendRelationship.friendA === user.idUser ? friendRelationship.friendB : friendRelationship.friendA)
          })
          return Promise.all(promises).then(response => {
            return response
          })
        })
      }
    }
  })
});

export default UserType;
