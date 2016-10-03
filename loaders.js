import User from './models/user';
import Todo from './models/todo';

export const getUserById = (id) => User.findByIdAsync(id).then(user => {
  user = user.toJSON();
  user.id = user._id.toString();
  user.friends = user.friends.map(friend => friend.toString());
  user.bestFriend = user.bestFriend ? user.bestFriend.toString() : null;
  return user;
});

export const getUsers = () => User.findAsync()
.then(users => {
  users.forEach(user => {
    user = user.toJSON();
    user.id = user._id.toString();
    user.friends = user.friends.map(friend => friend.toString());
    user.bestFriend = user.bestFriend ? user.bestFriend.toString() : null;
    return user
  })
  return users;
})

export const getTodoById = (id) => Todo.findByIdAsync(id).then(todo => {
  todo = todo.toJSON();
  todo.id = todo._id.toString();
  todo.author = todo.author.toString();
  return todo;
})

export const getTodos = () => Todo.findAsync()
.then(todos => {
  todos.forEach(todo => {
    todo = todo.toJSON();
    todo.id = todo._id.toString();
    todo.author = todo.author.toString();
    return todo;
  })
  return todos;
})
