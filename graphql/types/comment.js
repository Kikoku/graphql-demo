import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
  name: 'comment',
  fields: {
    id: {
      type: GraphQLID
    },
    comment: {
      type: GraphQLString
    }
  }
});
