import {
  GraphQLInterfaceType,
  GraphQLString
} from 'graphql';
import UserType from './user';
import TodoType from './todo';
import SetType from './set';
import CardType from './card';

const SearchType = new GraphQLInterfaceType({
  name: 'Search',
  fields: {
    searchPreviewText: { type: GraphQLString }
  },
  description: 'Search for things',
  resolveType: (data) => {
    if(data.multiverse_id) {
      return CardType
    }
    if(data.description) {
      return SetType;
    }
    if(data.name) {
      return UserType;
    }
    if(data.title) {
      return TodoType;
    }
  }
});

export default SearchType;
