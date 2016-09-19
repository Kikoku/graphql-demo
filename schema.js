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
  fields: () => {
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

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoType),
      resolve: () => {
        return new Promise((resolve, reject) => {
          Todo.find((err, todos) => {
            if(err) reject(err)
            else resolve(todos)
          })
        });
      }
    }
  })
})
  }
});

module.exports = new GraphQLSchema({
  query: queryType
});
