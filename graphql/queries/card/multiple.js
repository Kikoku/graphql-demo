import {
  GraphQLList
} from 'graphql';
import cardLoader from '../../../loaders/card'

import CardType from '../../types/card';

export default {
  type: new GraphQLList(CardType),
  resolve: (user, args, {viewer}) => cardLoader.loadAll({viewer})
};
