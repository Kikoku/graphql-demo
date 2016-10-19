import user from './user';
import todo from './todo';
import search from './search';
import card from './card';
import set from './set';

export default {
  ...user,
  ...todo,
  ...search,
  ...card,
  ...set
}
