import {
  GraphQLInterfaceType,
  GraphQLString
} from 'graphql';
import UserType from './user';
import TodoType from './todo';

const SearchType = new GraphQLInterfaceType({
  name: 'Search',
  fields: {
    searchPreviewText: { type: GraphQLString }
  },
  description: 'Search for things',
  resolveType: (data) => {
    if(data.name) {
      return UserType;
    }
    if(data.title) {
      return TodoType;
    }
  }
});

export default SearchType;
