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

const canSee = (object, viewer) => {

  // NOTE: Verification OFF
  // return true;

  // NOTE: Verification ON
  return object.author === viewer.id;

}

export const getTodoById = ({id, viewer}) => Todo.findByIdAsync(id).then(todo => {
  todo = todo.toJSON();
  todo.id = todo._id.toString();
  todo.author = todo.author.toString();
  return canSee(todo, viewer) ? todo : null;
})

export const getTodos = ({viewer}) => Todo.findAsync()
.then(todos => {
  return todos.map(todo => {
    todo = todo.toJSON();
    todo.id = todo._id.toString();
    todo.author = todo.author.toString();
    return canSee(todo, viewer) ? todo : null;
  })
})
