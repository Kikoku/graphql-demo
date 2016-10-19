import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import setLoader from '../../../loaders/set'

import SetType from '../../types/set';

export default {
  type: SetType,
  args: {
    id: {
      name: 'Set id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args, {viewer}) => setLoader.load({id: args.id.toString(), viewer})
}
