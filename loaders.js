import User from './models/user';

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
