import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} from 'graphql';
import SetType from '../../types/set';
import Set from '../../../models/set';

export default {
  type: SetType,
  description: 'Add a set',
  args: {
    name: {
      name: 'Set string',
      type: new GraphQLNonNull(GraphQLString)
    },
    release_date: {
      name: 'Set Release Date',
      type: GraphQLString
    },
    description: {
      name: 'Short description of the set',
      type: GraphQLString
    },
    common: {
      name: '# of commons',
      type: GraphQLInt
    },
    uncommon: {
      name: '# of uncommons',
      type: GraphQLInt
    },
    rare: {
      name: '# of rares',
      type: GraphQLInt
    },
    mythic_rare: {
      name: '# of mythic_rares',
      type: GraphQLInt
    },
    basic_land: {
      name: '# of basic_lands',
      type: GraphQLInt
    },
    other: {
      name: '# of others',
      type: GraphQLInt
    },
    total: {
      name: 'total # of cards',
      type: GraphQLInt
    },
    block: {
      name: 'Block the set belongs to',
      type: GraphQLString
    },
    type: {
      name: '???',
      type: GraphQLString
    }
  },
  resolve: (root, args) => {
    let newSet = new Set({
      ...args
    })
    return newSet.saveAsync();
  }
}
