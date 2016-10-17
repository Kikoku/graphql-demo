import {
  GraphQLList
} from 'graphql';
import todoLoader from '../../../loaders/todo'

import TodoType from '../../types/todo';

export default {
  type: new GraphQLList(TodoType),
  resolve: (user, args, {viewer}) => todoLoader.loadAll({viewer})
};
