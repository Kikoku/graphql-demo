import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFieldConfigArgumentMap
} from 'graphql';

export const forwardConnectionArgs = {
  after: {
    type: GraphQLString
  },
  first: {
    type: GraphQLInt
  },
};

export const backwardConnectionArgs = {
  before: {
    type: GraphQLString
  },
  last: {
    type: GraphQLInt
  },
};

export const connectionArgs = {
  ...forwardConnectionArgs,
  ...backwardConnectionArgs,
};

function resolveMaybeThunk(thingOrThunk) {
  return typeof thingOrThunk === 'function' ? thingOrThunk() : thingOrThunk;
}

export function connectionDefintions(config) {

  const  {nodeType}  = config;
  const name = config.name || nodeType.name;
  const edgeFields = config.edgeFields || {};
  const connectionFields = config.connectionFields || {};
  const resolveNode = config.resolveNode;
  const resolveCursor = config.resolveCursor;
  const edgeType = new GraphQLObjectType({
    name: `${name}Edge`,
    description: 'An edge in a conneciton.',
    fields: () => ({
      node: {
        type: nodeType,
        resolve: resolveNode,
        description: 'The item at the end of the edge'
      },
      cursor: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: resolveCursor,
        description: 'A cursor for use in pagination'
      },
      ...(resolveMaybeThunk(edgeFields))
    })
  })

  const connectionType = new GraphQLObjectType({
    name: name + 'Connection',
    description: 'A connection to a list of items.',
    fields: () => ({
      pageInfo: {
        type: new GraphQLNonNull(pageInfoType),
        description: 'Information to aid in pagination.'
      },
      edges: {
        type: new GraphQLList(edgeType),
        description: 'A list of edges.'
      },
      ...(resolveMaybeThunk(connectionFields))
    })
  })

  return {edgeType, connectionType}

}

const pageInfoType = new GraphQLObjectType({
  name: 'PageInfo',
  description: 'Information about pagination in a connection.',
  fields: () => ({
    hasNextPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When paginationg forwards, are there more items?'
    },
    hasPreviousPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When pagination backwards, are there more items?'
    },
    startCursor: {
      type: GraphQLString,
      description: 'When pagination backwards, the cursor to continue.'
    },
    endCursor: {
      type: GraphQLString,
      description: 'When pagination forwards, the cursor to continue.'
    }
  })
})
