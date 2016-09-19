import {
  graphql,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema ({
  title: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

const TodoType = new GraphQLObjectType({
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
