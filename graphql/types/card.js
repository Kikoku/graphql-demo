import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';3
import SetType from './set';

const CardType = new GraphQLObjectType({
  name: 'Card',
  fields: () => ({
    id: { type: GraphQLID },
    multiverse_id: {type: GraphQLInt},
    name: {type: GraphQLString },
    cost: {type: GraphQLString },
    cmc: {type: GraphQLInt},
    type: {type: GraphQLString },
    subtype: {type: GraphQLString },
    rarity: {type: GraphQLString },
    set_code: {type: GraphQLString },
    set_id: {
      type: SetType,
      resolve: (card, args) => card.set_id ? setLoader.load(card.set_id) : null
    },
    oracle: {type: GraphQLString },
    flavor: {type: GraphQLString },
    number: {type: GraphQLInt},
    side: {type: GraphQLString },
    artist: {type: GraphQLString },
    power: {type: GraphQLString },
    toughness: {type: GraphQLString },
    loyalty: {type: GraphQLInt},
    related_card_id: {type: GraphQLInt},
    colors: {type: new GraphQLList(GraphQLString)},
    released_at: {type: GraphQLString }
  })
})

export default CardType;
