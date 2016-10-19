import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';
import searchLoader from '../../../loaders/search'

import SearchType from '../../types/search';

export default {
  type: new GraphQLList(SearchType),
  args: {
    text: {
      name: 'Search Text',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args, {viewer}) => searchLoader({query: args.text, viewer})
};
