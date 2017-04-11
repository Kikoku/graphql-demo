import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';
import queryType from './queries';
import mutations from './mutations';

export default new GraphQLSchema({
  query: queryType,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
  })
})
