import User from './models/user';

export const getUserById = ({id, location}) => User.findByIdAsync(id).then(user => {
  console.log(user.id, location, typeof user.id);
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
