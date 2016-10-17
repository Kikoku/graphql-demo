import User from './models/user';
import Todo from './models/todo';

export const getUserById = (id) => User.findByIdAsync(id)

export const getUsers = () => User.findAsync()

const canSee = (object, viewer) => {

  // NOTE: Verification OFF
  return true;

  // NOTE: Verification ON
  // return object.author === viewer.id;

}

export const getTodoById = ({id, viewer}) => Todo.findByIdAsync(id)
.then(todo => {
  return canSee(todo, viewer) ? todo : null;
})

export const getTodos = ({viewer}) => Todo.findAsync()
.then(todos => {
  return todos.map(todo => {
    return canSee(todo, viewer) ? todo : null;
  })
})
