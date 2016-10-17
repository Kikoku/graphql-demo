import Todo from '../models/todo';
import DataLoader from 'dataloader';
import {canSee} from '../helpers'

const getTodoById = ({id, viewer}) => Todo.findByIdAsync(id)
.then(todo => {
  return canSee(todo, viewer) ? todo : null;
})

const getTodos = ({viewer}) => Todo.findAsync()
.then(todos => {
  return todos.map(todo => {
    return canSee(todo, viewer) ? todo : null;
  })
})

const todoLoader = new DataLoader(
  keys => Promise.all(keys.map(getTodoById)),
  {
    cacheKeyFn: key => {
      return key.toString();
    }
  }
)

const todosLoader = new DataLoader(
  keys => Promise.all(keys.map(getTodos))
)

todoLoader.loadAll = todosLoader.load.bind(todosLoader, '__all__');

export default todoLoader;
