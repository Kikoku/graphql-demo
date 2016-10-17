import Todo from './models/todo';

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
