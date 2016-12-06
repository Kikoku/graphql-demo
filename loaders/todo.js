import Todo from '../models/todo';
import DataLoader from 'dataloader';
import {canSee} from '../helpers'

const getTodoById = ({id, viewer}) => Todo.findByIdAsync(id)
.then(todo => {
  return canSee(todo, viewer) ? todo : null;
})

const todoLoader = new DataLoader(
  keys => Promise.all(keys.map(getTodoById)),
  {
    cacheKeyFn: key => {
      return key.toString();
    }
  }
)

export default todoLoader;
