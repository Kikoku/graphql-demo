import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import cardLoader from '../../../loaders/card'

import CardType from '../../types/card';

export default {
  type: CardType,
  args: {
    id: {
      name: 'Card id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args, {viewer}) => cardLoader.load({id: args.id.toString(), viewer})
}
