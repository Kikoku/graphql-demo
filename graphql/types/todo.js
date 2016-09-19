import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'

export default new GraphQLObjectType({
  name: 'todo',
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    completed: {
      type: GraphQLBoolean
    }
  }
});
