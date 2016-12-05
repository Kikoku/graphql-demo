import {
  GraphQLInt,
  GraphQLList
} from 'graphql';

import {
  connectionFromArray,
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay'

function rootConnection(name, type) {
  var graphqlType = typeToGraphQLType(type);
  var { connectionType } = connectionDefinitions({
    name: name,
    nodeType: graphqlType,
    connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: (conn) => conn.totalCount,
        description: 'A count of the total number of objects in this connection.'
      },
      [type]: {
        type: new GraphQLList(graphqlType),
        resolve: (conn) => conn.edges.map((edge) => edge.node),
        description: 'A list of all of the objects returned in the connection'
      }
    })
  });

  return {
    type: connectionType,
    args: connectionArgs,
    resolve: (_,args) => {
      var { objects, totalCount} = getObjectsByType(type, args);
      return {
        ...connectionFromArray(objects, args),
        totalCount: totalCount
      }
    }
  }
}
