import User from './models/user';

const sanatizeUser = (user, viewer) => {
  if (user === null) return null;
  user = user.toJSON();
  user.id = user._id.toString();
  user.friends = user.friends.map(friend => friend.toString());
  user.bestFriend = user.bestFriend ? user.bestFriend.toString() : null;
  return canSee(user, viewer) ? user : null;
}

const canSee = (object, viewer) => {
  // TODO: Create viewing logic
  return (object.id === viewer.id)
}

export const getUserById = ({id, viewer}) => User.findByIdAsync(id).then(user => sanatizeUser(user, viewer));

export const getUsers = ({viewer}) => User.findAsync().then(users => users.map(user => sanatizeUser(user, viewer)));
