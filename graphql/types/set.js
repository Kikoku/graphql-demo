import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import CardType from './card';

const SetType = new GraphQLObjectType({
  name: 'Set',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    release_date: { type: GraphQLString },
    description: { type: GraphQLString },
    common: { type: GraphQLInt },
    uncommon: { type: GraphQLInt },
    rare: { type: GraphQLInt },
    mythic_rare: { type: GraphQLInt },
    basic_land: { type: GraphQLInt },
    other: { type: GraphQLInt },
    total: { type: GraphQLInt },
    block: { type: GraphQLString },
    type: { type: GraphQLString },
    card_ids: {
      type: new GraphQLList(CardType),
      resolve: (set, args) => CardLoader.loadMany(set.card_ids)
    }
  })
})

export default SetType;