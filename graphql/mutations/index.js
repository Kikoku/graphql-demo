import user from './user';
import todo from './todo';
import set from './set';
import card from './card'

export default {
  ...user,
  ...todo,
  ...set,
  ...card
}
