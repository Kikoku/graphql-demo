import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} from 'graphql';
import CardType from '../../types/card';
import Card from '../../../models/card';

export default {
  type: CardType,
  description: 'Add a card',
  args: {
    multiverse_id: {type: new GraphQLNonNull(GraphQLInt)},
    name: {type: new GraphQLNonNull(GraphQLString) },
    cost: {type: GraphQLString },
    cmc: {type: GraphQLInt},
    type: {type: new GraphQLNonNull(GraphQLString) },
    subtype: {type: GraphQLString },
    rarity: {type: new GraphQLNonNull(GraphQLString) },
    set_code: {type: GraphQLString },
    set_id: { type: new GraphQLNonNull(GraphQLID) },
    oracle: {type: GraphQLString },
    flavor: {type: GraphQLString },
    number: {type: new GraphQLNonNull(GraphQLInt)},
    side: {type: GraphQLString },
    artist: {type: GraphQLString },
    power: {type: GraphQLString },
    toughness: {type: GraphQLString },
    loyalty: {type: GraphQLInt},
    related_card_id: {type: GraphQLInt},
    released_at: {type: GraphQLString }
  },
  resolve: (root, args) => {
    let newCard = new Card({
      ...args
    })
    return newCard.saveAsync();
  }
}
