import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql';
import UserType from './user'

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      resolve: (viewer, args) => {
        return {
          id: '1234',
          name: 'Test resolve',
          bestFriend: null,
          friends: []
        }
      }
    }
  })
})

export default ViewerType
