import {
  graphql,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} from 'graphql';
var TodoType = new GraphQLObjectType({
  name: 'todo',
  fields: function () {
    return {
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
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      todos: {
        type: new GraphQLList(TodoType),
        resolve: function () {
          return TODOs;
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: queryType
});
