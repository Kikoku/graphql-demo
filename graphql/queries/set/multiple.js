import {
  GraphQLList
} from 'graphql';
import setLoader from '../../../loaders/set'

import SetType from '../../types/set';

export default {
  type: new GraphQLList(SetType),
  resolve: (user, args, {viewer}) => setLoader.loadAll({viewer})
};
