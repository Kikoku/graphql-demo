import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} from 'graphql';
import {
  connectionDefinitions,
  connectionFromPromisedArray,
  connectionFromArray,
  connectionArgs,
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay';

import mutations from './mutations';
import User from '../models/user'

function getObjectsByType(type, args) {
  var objects = [];
  var totalCount = 0;

  return {
    objects: User.findAsync(),
    totalCount: User.countAsync()
  }
}

function getObjectByTypeAndId(type, id) {
  return User.findByIdAsync(id)
}

function typeToGraphQLType(type) {
  var UserType = require('./types/user');

  switch (type) {
    case 'user':
      return UserType.default
  }
}

function rootFieldById(idName, type) {
  var getter = (id) => User.findByIdAsync(id);
  var argDefs = {};
  argDefs.id = {type: GraphQLID};
  argDefs[idName] = {type: GraphQLID};

  return {
    type: typeToGraphQLType(type),
    args: argDefs,
    resolve: (_, args) => {

      if(args[idName] !== undefined && args[idName] !== null) {
        return getter(args[idName])
      }

      if(args.id !== undefined && args[idName] !== null) {
        return getter(args.id)
      }

      throw new Error(`must provide id or ${idName}`)
    }
  }
}

function rootConnection(name, type) {
  var graphqlType = typeToGraphQLType(type);
  var {connectionType} = connectionDefinitions({
    name: name,
    nodeType: graphqlType
  });

  return {
    type: connectionType,
    args: connectionArgs,
    resolve: (_, args) => {
      return Promise.all([
        User.findAsync(),
        User.countAsync()
      ]).then(([objects = [], totalCount = 0]) => {
        return {
          ...connectionFromArray(objects, args),
        }
      })
    }
  }
}

const rootFields = () => ({
  allusers: rootConnection('Users', 'user'),
  user: rootFieldById('user', 'user')
})

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: rootFields
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
  })
})
