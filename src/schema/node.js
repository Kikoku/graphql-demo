import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay';
import UserType from './types/user';
import TodoType from './types/todo';
import { getObjectById } from './apiHelpers';

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return getObjectById(type.toLowerCase(), id)
  },
  (object) => {
    if(object.name) {
      return UserType;
    }
    if(object.title) {
      return TodoType
    }
    return null;
  }
)
